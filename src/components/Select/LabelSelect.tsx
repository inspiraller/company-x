import { Label } from "@/components/Input/Label";
import { PropsWithChildren } from "react";
import { PropsSelect, Select } from "./Select";

export interface PropsLabelSelect extends PropsSelect {
  label: PropsWithChildren["children"];
}
export const LabelSelect = ({ label, ...propsSelect }: PropsLabelSelect) => {
  return (
    <Label>
      <span>{label}</span>
      <Select {...propsSelect} />
    </Label>
  );
};
