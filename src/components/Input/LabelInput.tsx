import { PropsWithChildren } from "react";
import { Input, PropsInput } from "./Input";
import { Label } from "./Label";

export interface PropsLabelInput extends PropsInput {
  label: PropsWithChildren["children"];
}

export const LabelInput = ({
  label,
  ...inputProps
}: PropsLabelInput) => (
  <Label>
    <span>{label}</span>
    <Input {...inputProps} />
  </Label>
);
