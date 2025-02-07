import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LabelInput } from "@/components/Input/LabelInput";
import { Wrapper } from "../../__util/_FormWrapper";
import Link from "next/link";

describe("LabelInput", () => {
  it("Should render LabelInput as type number", () => {
    render(
      <Wrapper>
        <LabelInput name="amount" label="Amount" type="number" placeholder="0" />
      </Wrapper>
    );
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  });
  it("Should render LabelInput as type checkbox", () => {
    render(
      <Wrapper>
        <LabelInput name="enabled" label="accept" type="checkbox" placeholder="Accept terms" />
      </Wrapper>
    );
    expect(screen.getByLabelText("accept")).toBeInTheDocument();
  });
  it("Should be able to render any inline element in Label of LabelInput", () => {
    render(
      <Wrapper>
        <LabelInput name="enabled" label={<><span>Hello world</span><Link href="/" /></>} type="checkbox" placeholder="Accept terms" />
      </Wrapper>
    );
    expect(screen.getByLabelText("Hello world")).toBeInTheDocument();
  });
});
