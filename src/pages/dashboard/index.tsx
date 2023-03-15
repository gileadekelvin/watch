import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";

import Submenu from "~/components/layout/Submenu";
import Overview from "~/components/Overview";
import GithubFilters from "~/components/GithubFilters";

const Dashboard: NextPage = () => {
  const [githubFilter, setGithubFilter] = useState("involved");

  return (
    <>
      <Submenu tab="overview" />
      <Head>
        <title>Dashboard - Watch</title>
        <meta name="description" content="Dashboard - Watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh-113px)] flex-col items-center bg-zinc-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 py-8">
          <h1 className="text-2xl font-medium">Pull Requests</h1>
          <div className="grid min-w-full grid-cols-1 md:grid-cols-12">
            <div className="col-span-12 col-start-1 w-full py-2 md:col-span-3">
              <GithubFilters
                filter={githubFilter}
                setFilter={setGithubFilter}
              />
            </div>
            <div className="col-span-12 col-start-4 sm:w-[700px] md:col-span-9">
              <Overview filter={githubFilter} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
