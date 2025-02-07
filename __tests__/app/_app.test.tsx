import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "@/pages/_app";
import Home from "@/pages";
import type { AppProps } from 'next/app'
import type { Router } from 'next/router'

const mockRouter: Partial<Router> = {};

describe("_app", () => {
  it("Should render layout", () => {
    const props: AppProps = {
      Component: (props) => (
        <Home {...props } />
      ),
      pageProps: {},
      router: mockRouter as Router
    }
    render(
      <App {...props} />
    );
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });
});
