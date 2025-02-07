import React from "react";
import Link from "next/link";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsFormIsaX } from "@/types";

import { Row } from "@/components/Row/Row";
import { Button } from "@/components/Button/Button";

import { useSchema } from "./useSchema";
import { useSubmit } from "./useSubmit";
import { OPTION, useOptions } from "./options";
import { Select } from "./Select";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";

const defaultValues: PropsFormIsaX = {
  amount: 0,
  enabled: false,
  ISAOption: OPTION.value,
};

export const FormIsaXForm = () => {
  const zodValidationSchema = useSchema();
  const methods = useForm<PropsFormIsaX>({
    resolver: zodResolver(zodValidationSchema),
    mode: "onChange",
    defaultValues,
  });
  const { handleSubmit, formState } = methods;
  const { onSubmit } = useSubmit();
  const { options } = useOptions();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Select
            name={"ISAOption"}
            label="ISA Options"
            options={options}
            required
          />
        </Row>
        <Row>
          <Input
            name={"amount"}
            type="number"
            label="Amount"
            placeholder="0"
            required
          />
        </Row>
        <Row>
          <Checkbox
            name={"enabled"}
            label={
              <>
                <span>Please check the terms before confirming</span>{" "}
                <Link href={"/Terms"} target="_blank">
                  Terms
                </Link>
              </>
            }
            placeholder="Accept terms"
            required
          />
        </Row>

        <Row>
          <Button type="submit" isActive={formState.isValid}>
            Submit
          </Button>
        </Row>
      </form>
    </FormProvider>
  );
};
