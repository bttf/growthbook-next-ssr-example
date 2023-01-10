import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const FEATURES_ENDPOINT =
  "http://localhost:3100/api/features/prod_AketOD945Ctes2OD4B8CrO8cuoNNQe7VzJTWGhdFc";

const growthbook = new GrowthBook({
  trackingCallback: (experiment, result) => {
    console.log("Viewed Experiment", experiment, result);
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Refresh features and targeting attributes on navigation
  useEffect(() => {
    growthbook.setAttributes({
      id: "duderooney",
      loggedIn: true,
      deviceId: "abcdef123456",
      employee: true,
      company: "acme",
      country: "US",
      browser: navigator.userAgent,
      url: router.pathname,
    });
  }, [router.pathname]);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <Component {...pageProps} />
    </GrowthBookProvider>
  );
}
