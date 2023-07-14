import { Header } from "@/components";
import NotificationsFeed from "@/components/NotificationsFeed";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

const Notifications = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => {
  return (
    <>
      <Head>
        <title>Notificatons</title>
      </Head>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) return { redirect: { destination: "/", permanent: false } };

  return { props: { session } };
};

export default Notifications;
