import { expect, describe, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Wrapper } from "../../__util/_FormWrapper";

import { act } from "react";
import { PropsOptions } from "@/components/Select/Select";
import { LabelSelect } from "@/components/Select/LabelSelect";

const options: PropsOptions[] = [
  {
    label: "ISA Option X",
    value: "IsaOptionX",
  },
  {
    label: "ISA Option Y",
    value: "IsaOptionY",
  },
];

const label = "ISA Options";

describe("FormIsaXSelect", () => {
  it("Should render Select", () => {
    render(
      <Wrapper>
        <LabelSelect name="ISAOption" label={label} options={options} />
      </Wrapper>
    );
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });
  it("Should select different option", () => {
    render(
      <Wrapper>
        <LabelSelect name="ISAOption" label={label} options={options} />
      </Wrapper>
    );
    act(() => {
      const Select = screen.getByRole("combobox") as HTMLSelectElement;
      fireEvent.change(Select, { target: { value: options[1].value } });
      expect(Select.value).toEqual(options[1].value);
    });
  });
});
