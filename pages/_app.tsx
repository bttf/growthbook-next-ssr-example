import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const FEATURES_ENDPOINT =
  "http://localhost:3100/api/features/prod_AketOD945Ctes2OD4B8CrO8cuoNNQe7VzJTWGhdFc";

export const growthbook = new GrowthBook({
  trackingCallback: (experiment, result) => {
    console.log("Viewed Experiment", experiment, result);
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <Component {...pageProps} />
    </GrowthBookProvider>
  );
}
