import Layout from "@/components/layout/Layout";
import { store } from "@/components/redux/store";
import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Layout>
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
