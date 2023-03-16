import Head from "next/head";
import Submenu from "~/components/layout/Submenu";

const Activities = () => {
  return (
    <>
      <Submenu tab="activities" />
      <Head>
        <title>Activities - Watch</title>
        <meta name="description" content="Activities - Watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh-113px)] flex-col items-center bg-zinc-50">
        <div className="flex w-full max-w-5xl flex-col items-start gap-8 px-4 py-8">
          <h1 className="text-2xl font-medium">Activities</h1>
          <span className="text-gray-600">
            Important activities from your repositories will be available soon.
          </span>
        </div>
      </main>
    </>
  );
};

export default Activities;
