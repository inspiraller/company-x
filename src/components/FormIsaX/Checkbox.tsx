
import { withError } from "@/components/WrapError/withError";
import { LabelCheckbox } from "@/components/Input/LabelCheckbox";
import { PropsInputEnforceName } from "./Input";
export const Checkbox = withError<Omit<PropsInputEnforceName, "type">>(LabelCheckbox);