import { Toaster } from "@/components/ui/sonner";
import Layout from "@/src/components/layout/Layout";
import { store } from "@/src/components/redux/store";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";
import { Provider } from "react-redux";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <NextTopLoader color="red" />
        <Toaster />
        <Head>
          <title>CRM panel</title>
          <meta name="description" content="CRM panel" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
