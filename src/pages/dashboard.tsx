import { type GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth";

import Navbar from "~/components/layout/Navbar";
import { authOptions } from "~/server/auth";

const Dashboard: NextPage = () => {
  return (
    <>
      <Navbar />
      <Head>
        <title>Dashboard - Watch</title>
        <meta name="description" content="Dashboard - Watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-32">
          Dashboard
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/auth/signin" } };
  }

  return {
    props: { authed: true },
  };
}

export default Dashboard;
