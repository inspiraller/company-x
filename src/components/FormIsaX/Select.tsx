import { Path } from "react-hook-form";
import { PropsLabelSelect, LabelSelect } from "../Select/LabelSelect";
import { withError } from "@/components/WrapError/withError";
import { PropsFormIsaX } from "@/types";

interface PropsSelectEnforceName extends PropsLabelSelect {
  name: Path<PropsFormIsaX>;
}
export const Select = withError<PropsSelectEnforceName>(LabelSelect);
