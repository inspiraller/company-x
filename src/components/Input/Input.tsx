import { useFormContext, Path, FieldValues } from "react-hook-form";

export interface PropsInput {
  name: Path<FieldValues>;
  type: HTMLInputElement["type"];
  placeholder?: string;
  required?: boolean;
}
                                   
export const Input = ({
  name,
  type,
  placeholder,
  required
}: PropsInput) => {
  const { register, clearErrors } = useFormContext();
  const valueAsNumber = type === "number";
  return (
    <input
      type={type}
      {...register(name, { valueAsNumber, required })}
      placeholder={placeholder}
      onInput={() => clearErrors(name)}
    />
  );
};
