import Layout from "@/components/layout/Layout";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

//redux
import { store } from "@/components/redux/store";
import { Provider } from "react-redux";

//styles
import "@/styles/globals.css";

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
