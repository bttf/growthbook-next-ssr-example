import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useGrowthBook } from "@growthbook/growthbook-react";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { FEATURES_ENDPOINT, growthbook } from "./_app";
import Link from "next/link";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(FEATURES_ENDPOINT);
  const json = await res.json();

  growthbook.setFeatures(json.features);

  growthbook.setAttributes({
    id: "123",
    loggedIn: true,
    deviceId: "abcdef123456",
    employee: true,
    company: "acme",
    country: "US",
    browser: "nextjs-node",
    url: context.req.url,
  });

  const showWelcomeBanner = growthbook.feature("welcome-message").on;

  return {
    props: { showWelcomeBanner },
  };
}

export default function Home({
  showWelcomeBanner: _showWelcomeBanner,
}: {
  showWelcomeBanner: boolean;
}) {
  const router = useRouter();
  const gb = useGrowthBook();

  const [showWelcomeBanner, setShowWelcomeBanner] =
    useState(_showWelcomeBanner);

  // This following useEffect is not necessary, however you may like to use if
  // you'd want to re-evaluate feature flags on the client-side due to any state
  // change. (e.g. the user // logs in, or switches employment status, etc.)
  useEffect(() => {
    if (!gb) return;

    gb.setAttributes({
      id: "duderooney",
      loggedIn: true,
      deviceId: "abcdef123456",
      employee: true,
      company: "acme",
      country: "US",
      browser: navigator.userAgent,
      url: router.pathname,
    });

    fetch(FEATURES_ENDPOINT)
      .then((res) => res.json())
      .then((json) => {
        gb.setFeatures(json.features);
        setShowWelcomeBanner(gb.feature("welcome-message").on);
      });
  }, [gb, router.pathname]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {showWelcomeBanner && (
          <h1>Welcome to Next.js equipped w/ SSR Growthbook</h1>
        )}
        <h2>
          We should see a welcome banner above this. It should load without
          flickering (feature-flag rendered server-side).
        </h2>
        <Link href="/no-welcome">Go to No-Welcome page</Link>
      </main>
    </>
  );
}
