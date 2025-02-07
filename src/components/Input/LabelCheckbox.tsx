import { Input } from "./Input";
import { Label } from "./Label";
import { PropsLabelInput } from "./LabelInput";

export const LabelCheckbox = ({
  label,
  ...inputProps
}: Omit<PropsLabelInput, 'type'>) => (
  <Label>
    <Input {...inputProps} type="checkbox" />
    <span>{label}</span>
  </Label>
);

