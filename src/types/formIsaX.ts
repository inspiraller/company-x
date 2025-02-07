import { FieldValuesFromFieldErrors } from "@hookform/error-message";
import { FieldErrors, FieldName } from "react-hook-form";


export interface PropsFormIsaX {
  amount: number;
  ISAOption: string;
  enabled: boolean;
}

// TODO: Fix messy hack <ErrorMessage name={name as unknown as ReatHookError<TFormValues>}

export type ReatHookError<TFormValues extends object> = FieldName<FieldValuesFromFieldErrors<FieldErrors<TFormValues>>>;