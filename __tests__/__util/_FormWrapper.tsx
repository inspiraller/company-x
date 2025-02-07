import "@testing-library/jest-dom";

import { useSchema } from "@/components/FormIsaX/useSchema";
import { FormProvider, useForm } from "react-hook-form";
import { PropsFormIsaX } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmit } from "@/components/FormIsaX/useSubmit";
import { PropsWithChildren } from "react";

export const Wrapper = ({ children }: PropsWithChildren) => {
  const zodValidationSchema = useSchema();
  const methods = useForm<PropsFormIsaX>({
    resolver: zodResolver(zodValidationSchema),
  });
  const { handleSubmit } = methods;
  const { onSubmit } = useSubmit();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

