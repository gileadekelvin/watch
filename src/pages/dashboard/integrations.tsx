import Head from "next/head";
import Image from "next/image";
import Submenu from "~/components/layout/Submenu";
import { Button } from "~/components/ui/button";

import Jira from "public/images/jira.png";

const Settings = () => {
  return (
    <>
      <Submenu tab="integrations" />
      <Head>
        <title>Integrations - Watch</title>
        <meta name="description" content="Integrations - Watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh-113px)] flex-col items-center bg-zinc-50">
        <div className="flex w-full max-w-5xl flex-col items-start gap-8 px-4 py-8">
          <h1 className="text-2xl font-medium">Integrations</h1>
          <div className="flex w-full max-w-sm flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
            <Image width={48} height={48} src={Jira} alt="Jira" />
            <div>
              <span className="mr-2 text-gray-400">available soon</span>
              <Button disabled variant="outline">
                Add
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
