import { PropsWithChildren } from "react";

// seperate if we need to grow the component with - htmlFor, accessibility etc, theming etc.
export const Label = ({ children }: PropsWithChildren) => {
  return <label>{children}</label>;
};
