import { Path } from "react-hook-form";
import { withError } from "@/components/WrapError/withError";
import { LabelInput, PropsLabelInput } from "@/components/Input/LabelInput";
import { PropsFormIsaX } from "@/types";

export interface PropsInputEnforceName extends PropsLabelInput {
  name: Path<PropsFormIsaX>;
}
export const Input = withError<PropsInputEnforceName>(LabelInput);
