import React, { PropsWithChildren } from "react";
import { ErrorMessage } from "@hookform/error-message";

import { Path, FieldValues, useFormContext } from "react-hook-form";
import stylesError from "@/styles/errors.module.css";

export interface PropsWrapError extends PropsWithChildren {
  name: Path<FieldValues>
}
export const WrapError = ({
  name,
  children,
}: PropsWrapError) => {
  const { formState: {errors} } = useFormContext();
  return (
    <>
      {children}

      {errors[name] ? (
        <div className={stylesError.errors}>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({message}) => <p>{message}</p>}
          />
        </div>
      ) : null}
    </>
  );
};
