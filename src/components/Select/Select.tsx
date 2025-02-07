import { Path, FieldValues, useFormContext } from "react-hook-form";

export interface PropsOptions {
  label: string;
  value: string;
}
export interface PropsSelect {
  name: Path<FieldValues>;
  options: PropsOptions[];
  required?: boolean;
}
export const Select = ({ name, options, required }: PropsSelect) => {
  const { register, clearErrors } = useFormContext();
  return (
    <select
      defaultValue={options?.[0].value}
      {...register(name, { required })}
      onChange={() => clearErrors(name)}
      onInput={() => clearErrors(name)}
    >
      {options.map((item) => {
        return (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};
