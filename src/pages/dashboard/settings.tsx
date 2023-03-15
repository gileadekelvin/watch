/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Submenu from "~/components/layout/Submenu";
import { Button } from "~/components/ui/button";

const Settings = () => {
  const { data: sessionData, status } = useSession();

  return (
    <>
      <Submenu tab="settings" />
      <Head>
        <title>Settings - Watch</title>
        <meta name="description" content="Settings - Watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh-113px)] flex-col items-center bg-zinc-50">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
          {sessionData && (
            <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white ">
              <div className="flex flex-col items-center py-8 pb-10">
                <>
                  <img
                    className="mb-3 h-24 w-24 rounded-full shadow-lg"
                    src={sessionData.user.image as string}
                    alt="Profile"
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {sessionData?.user.name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {sessionData?.user.email}
                  </span>
                </>
                <div className="mt-4 flex space-x-3 md:mt-6">
                  <Button
                    variant="outline"
                    onClick={() =>
                      window
                        ?.open(
                          "https://github.com/apps/watch-beta/installations/new",
                          "_blank"
                        )
                        ?.focus()
                    }
                  >
                    Configure App
                  </Button>
                  <Button
                    variant={sessionData ? "destructive" : "default"}
                    onClick={
                      sessionData ? () => void signOut() : () => void signIn()
                    }
                  >
                    {sessionData ? "Sign out" : "Sign in"}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {!sessionData && status === "unauthenticated" && (
            <div className="mt-4 flex space-x-3 md:mt-6">
              <Button
                variant={sessionData ? "destructive" : "default"}
                onClick={
                  sessionData ? () => void signOut() : () => void signIn()
                }
              >
                {sessionData ? "Sign out" : "Sign in"}
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Settings;
