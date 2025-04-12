import AddCostumerPage from "@/src/components/templates/dashboard/AddCostumerPage";
import { verifyToken } from "@/src/utils/functions";
import Head from "next/head";

function index() {
  return (
    <>
      <Head>
        <title>add costumer</title>
      </Head>
      <AddCostumerPage />
    </>
  );
}

export default index;
export async function getServerSideProps(context) {
  const { jwtToken } = context.req.cookies;
  const result = jwtToken && verifyToken(jwtToken);

  if (!result) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
}
