### Description of requirement

CompanyX. CompanyX would like to be able to offer ISA investments to retail (direct) customers who are not associated with an employer. CompanyX would like to keep the functionality for retail ISA customers separate from it’s Employer based offering where practical.
When customers invest into a CompanyX ISA they should be able to **select a single fund** from a **list** of available options.Currently they will be **restricted to selecting a single** fund however in the **future** we would anticipate allowing selection of **multiple options**.

Once the customer’s **selection** has been made, they should also be able to **provide details of the amount** they would like to invest. **Given** the customer has both made their **selection** and provided the **amount** the system should **record these values** and allow these details to be **queried at a later date**.

#### Example:
As a specific use case please consider a **customer** who wishes to **deposit £25,000** into a CompanyX ISA all into the **CompanyX Equities Fund**.

----------------------------------------------
### Questions
- Is this form within a protected signup account page?
- Has the user preselected their crediting account?
- Is there going to be an option to selected a different crediting account?
- Can the user source from multiple funding accounts?
- What legal terms is CompanyX required to display to the user during this interaction, and what specific Terms do we need to provide for this ISA Type?
- What is the maximum or minimum amount that the user enter for this specific ISA Type?
- What position is this form relative to any continuation breadcrumb steps? and do they need to be updated during the flow?
- What comes next during pending, success, error, and how to display that to the user?
- Is there going to be a future need for different currency or language?
- Is this intended as an Add on to existing functionality or encapsulated into own work flow?

----------------------------------------------------------
### Tech Stack
#### Database 

- **postgres**
  - Cost, ease of use, testing locally
  - Rich security features
  - AWS RDS or custom on ec2 

  **Example tables**
  
  - Table: IsaOptions 
    - isaId
    - isaName
    - max
    - min
    - termsLink
    - ? other meta data associated with ISAOption

  - Table: IsaTransactionStates
    - transactionId
    - isaId
    - userId or 'from Id' and 'to Id'
    - fromBank
    - toBank
    - amount
    - transactionState - pending | credit | debit
    - transactionDateTime

#### Api 
- **nextjs api routes**
  - Already building react app, so can serve api routes (only small load)
  - Easy to migrate to external api handler as application grows

- *Future migration:*
  - express - same as next
  - fastify - performance
  - nestjs (learning curve)
  - encore (learning curve) - best performance

#### Api documentation 
- **Swagger ui**

#### Api Encryption 
- **AWS certificate Manager**
  - AWS cert 
  - easy to setup and quicker to adopt with other aws services
- **JWT for login tokens**
  - JWT: 
  - access token as authorisation bearer ()
  - http only cookie (refresh token)

#### Mocking api 
- **MSW**
  - MSW to localise dynamic data logic (avoiding third party to reduce security risk footprint)

#### Functional/Accessibility Testing
  - code quality, linting, testing
- **package.json**
  - *optional*: 
    - storybook or equivalent (library components)
    - sonar in pipeline
  - eslint
  - prettify
  - typescript - strict validation, exclude any
  - typescript checker
  - vitest
  - vitest coverage
  - react testing library
  - playwright (alternative: cypress)
  - axe, a11y
  - bundle size
  - msw

#### Theming
- **CompanyX based**, 
  - but can use custom styles, css modules for easy migration to different front end
- *other*
  - storybook or other resource
  - Css modules for easier transport or migration between static html or other future front framework

#### Localisation
- *optional*
  -  but can extend with react or next-intl

#### React dependencies
- next
- tanstack/react-query
- axios
- react-hook-form
- schema zod
- localisation if needed

-------------------------------------------------------
### UX flow

#### Given
(Based on original brief)
- Given user has registered an account
- Given user has already logged in
- Given user has pre-selected their crediting account
- Given user cannot use multiple funding accounts, for simplicity (mvp)

#### Extended behaviour
+ Adding a confirm checkbox, to prevent user accidentally hitting Enter.

#### Data requirements
- When loading Options, will need additional meta information
  - Maximum amount user can enter into amount field
  - Minimum amount user can enter into amount field
  - Information to associated with the confirmation checkbox
  - Information to display to the user while transaction is pending, associated with this Isa type.
  - Any specific functionality for Isa Option on success
  - Any Specific functionality on Isa Option on error

#### Registration information
**Registered user - accessToken**
- [accessToken, setAccessToken] = useState<accessToken>()
- useLogin: MutationFunction<AxiosResponse<accessToken>>
- useRefreshToken: MutationFunction<AxiosResponse<accessToken>>
- value={useLogin, setRefreshToken, useLogin}

#### Onload
**Onload - Isa option types**
-  eg: react-query > query > axios > getIsaOptions
- Example types for expecting data
```ts
type TermsType = "IsaOptionX" | "IsaOptionY"; 
// TermsType: determines which page/html/pdf link or content to reference or download /regarding terms and conditions specific to this ISA type.


interface IsaOption {
  label: string; // what to display to User for this ISA type
  value: string; // id of ISA
  termsType: TermsType;  
  minAmount: number; // minimum to invest
  maxAmount: number; // limit amount user can invest
  otherSteps?: unknown; 
  // to discover? duration of Isa?, 
  // Duration
  // Risk
  // APR
  // Date of interest paid
  // etc...
}
type IsaOptions = IsaOptions[]
type ISAOptionsResults = UseQueryResult<AxiosResponse<{options: IsaOptions}>
```

#### User journey
**render - Main inputs**:
- &lt;Select&gt; IsaOptions.map => &lt;option&gt; - Isa option
- &lt;Input&gt; - Amount to enter (validated by schema)
- &lt;Button type="button"&gt; Continue; - inactive state (but clickable)

**User action**: 
- Select - Isa option (preselected anyway) 
- Type - Amount

**rerender**
- &lt;Button type="button"&gt; Continue; - becomes active state

**User action**: 
- Click - Continue

**render - Confirm Amount**
- &lt;Input&gt; - Confirm Amount
OR just
- &lt;Checkbox&gt; - Accept terms (link to terms - opens in new widow)
- &lt;Button type="submit"n&gt; - inactive state

**User action**: 
- Type - Confirm Amount (matches original)
- Click - Button Submit

**rerender**
> Validation error: User must check - accept terms

**User action**: 
- Check - Accept

**rerender**
- &lt;Button type="submit"n&gt; - becomes active state

**User action**: 
- Click - Submit

3. **render - Pending and Error**
- pending...

**rerender**
> Error: Not enough funds in your account, max £2300
- &lt;Input&gt; Amount - emptied with information text and placeholder
  - Placeholder: Please re-enter amount
  - Information text: Your cannot enter more than your maximum funds: £2300
   (note: pre-filled incase it implies influence to use maximum)
- &lt;Button&gt; Continue - becomes inactive state

- &lt;InputConfirm&gt; Amount: hidden
- &lt;Checkbox&gt; Terms: hidden
- &lt;Button&gt; Submit - hidden

Repeat step 1

4. **render - Pending and Success**
- pending...

**onSubmit - amounts**
-  eg: react-query > mutate > axios > postAmountToIsa
```ts
  return axios({
    method: "POST",
    url: "/postAmountToIsa",
    headers: {
      'Content-Type': 'application/json',
      `Bearer ${activeKey}`  
      // activeKey captured in an AuthProvider and accessed via {activeKey} = useAuth
      // Protects posting sensitive user information in data object.
    },
    data: {
      isa,
      amount
    },
    withCredentials: true, // origin set for specific ip.
  });
```

**rerender**
- Success message - depending on the result of the api.



-------------------------------------------------------



#### What's included in this Demo?
**includes**

 - Basic form validation capturing main frontend user journey
 - schema for form validation of 3 fields
 - Some tests and coverage
 - mvp of user interaction
 - typescript enforcement of types


**excludes**
 - strict enforcement of - confirm amount input field before proceed
 - Any theming, styling, responsive layout, imagery, 
 - getting or posting of data
 - e2e testing
 - comprehensive react testing
 - Error handling
 - pipeline
 - mocking of api
 - api
  - Security/registration/login etc.
 - hooks for getting data from api (react-query > axios/fetch etc)
 - hooks for posting data to api (react-query > axios/fetch etc)
- deployment
- bundle size
- performance tweaking
- accessibility testing
- serialisation of token for cookie or jwt
- production build

--------------------------------------------
#### How to run this small demo?
- pre-requisites: nodejs, browser, terminal (bash)
- clone this repo
- npm i
- npm run test
- npm run dev
