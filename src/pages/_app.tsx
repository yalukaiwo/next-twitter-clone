import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components";
import { EditModal, LoginModal, RegisterModal } from "@/components/modals";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
