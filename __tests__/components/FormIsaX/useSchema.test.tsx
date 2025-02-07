import { OPTION } from "@/components/FormIsaX/options";
import { useSchema } from "@/components/FormIsaX/useSchema";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("useSchema", () => {
  it("should validate VALID properties", () => {
    const { result } = renderHook(() => useSchema());

    const objValidateMe = {
      enabled: true,
      ISAOption: OPTION.value,
      amount: 10,
    };

    act(() => {
      const validated = result.current.parse(objValidateMe);

      console.log({ validated });
      expect(validated).toEqual(objValidateMe);
    });
  });
  it("should invalidate INVALID properties and expect err.issues", () => {
    const objValidateMe = {
      enabled: false,
      ISAOption: undefined,
      amount: "not possible",
    };
    const { result } = renderHook(() => useSchema());
    act(() => {
      try {
        result.current.parse(objValidateMe);
      } catch (e) {
        const err = e as unknown as {
          issues: object;
        };
        expect(err?.issues).toEqual([
          {
            code: "invalid_type",
            expected: "number",
            received: "string",
            path: ["amount"],
            message: "Expected number, received string",
          },
          {
            received: undefined,
            code: "invalid_literal",
            expected: "ISAOptionX",
            path: ["ISAOption"],
            message: 'Invalid literal value, expected "ISAOptionX"',
          },
          {
            received: false,
            code: "invalid_literal",
            expected: true,
            path: ["enabled"],
            message: "Invalid literal value, expected true",
          },
        ]);
      }
    });
  });
});
