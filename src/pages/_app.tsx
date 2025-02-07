import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import React from "react";
import { AppProps } from "next/app";
import "@/styles/globals.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component }: AppPropsWithLayout) => {
  return (
    <main data-testid="main">
      <Component />
    </main>
  );
};
export default App;
