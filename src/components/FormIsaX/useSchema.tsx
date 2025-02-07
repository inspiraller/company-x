import { PropsFormIsaX } from "@/types";
import { z, ZodType } from "zod"; // Add new import
import { OPTION } from "./options";

export const useSchema = (): ZodType<PropsFormIsaX> => 
  z.object({
    amount: z.number().gt(0),
    ISAOption: z.literal(OPTION.value),
    enabled: z.literal(true)
  });
