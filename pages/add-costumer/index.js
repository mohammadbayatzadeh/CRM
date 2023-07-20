import AddCostumerPage from "@/components/templates/AddCostumerPage";
import Head from "next/head";

//functions
import { verifyToken } from "@/utils/functions";

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
  const result = verifyToken(jwtToken);

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
