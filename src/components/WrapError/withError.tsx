import React from "react";
import { WrapError } from "./WrapError";
import { FieldValues, Path } from "react-hook-form";

interface PropsWith {
  name: Path<FieldValues>;
}

const withError = <TCompProps extends PropsWith>(
  Component: React.ComponentType<TCompProps>
) => {
  const Wrapper = (props: TCompProps) => {
    const { name } = props;
    return (
      <WrapError name={name}>
        <Component {...props} />
      </WrapError>
    );
  };
  return Wrapper;
};

export { withError };
