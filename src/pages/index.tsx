import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";

import { Button } from "~/components/ui/button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Watch</title>
        <meta name="description" content="Don't miss, just code!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-32">
          <h1 className="text-center font-extrabold text-slate-900 sm:text-[5rem]">
            <span className="text-8xl text-slate-900">Watch</span>{" "}
            <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-6xl text-transparent">
              and Build
            </span>
          </h1>
          <p className="max-w-2xl text-center text-xl text-gray-500">
            Watch is a plataform to organize your development workflow. Keep
            tracking the code that you need to review and deploy.
          </p>
          <div className="mt-8 flex flex-col items-center gap-2">
            <Button className="px-8" onClick={() => void signIn()}>
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
