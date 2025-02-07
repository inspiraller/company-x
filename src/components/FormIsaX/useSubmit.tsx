import { PropsFormIsaX } from "@/types";

export const useSubmit = () => {
  const onSubmit = (values:PropsFormIsaX) => new Promise<boolean>(resolve => {
    console.log({values});
    resolve(true);
  })
  return {onSubmit};
}