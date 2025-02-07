import { useSubmit } from "@/components/FormIsaX/useSubmit";
import { act, renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

describe("useSubmit", () => {
  it("should return submit method which returns a promise", async () => {
    const { result } = renderHook(() => useSubmit(), {
      wrapper: ({ children }: PropsWithChildren) => <>{children}</>,
    });

    expect(result.current).toHaveProperty("onSubmit");
    const amount = 0;
    const ISAOption = 'ISA X';
    const enabled = true;
    let resp: boolean = false;
    await act(async ()=> {
      resp = await result.current.onSubmit({amount, ISAOption, enabled});
    })
    expect(resp).toBe(true);
  });
});
