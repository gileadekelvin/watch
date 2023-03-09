import { type NextPage } from "next";
import Head from "next/head";

import Submenu from "~/components/layout/Submenu";
import Overview from "~/components/Overview";

const Dashboard: NextPage = () => {
  return (
    <>
      <Submenu tab="overview" />
      <Head>
        <title>Dashboard - Watch</title>
        <meta name="description" content="Dashboard - Watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh-113px)] flex-col items-center bg-zinc-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-4 py-16">
          <Overview />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
