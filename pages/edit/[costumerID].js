import EditPage from "@/components/templates/EditPage";
import Head from "next/head";

//models
import Manager from "@/models/Manager";

//functions
import { verifyToken } from "@/utils/functions";

function edit({ data }) {
  const costumerData = JSON.parse(data);
  return (
    <>
      <Head>
        <title>
          {costumerData.firstName} {costumerData.lastName} panel
        </title>
      </Head>
      <EditPage data={costumerData} />
    </>
  );
}

export default edit;

export async function getServerSideProps(context) {
  const { jwtToken } = context.req.cookies;
  const { costumerID } = context.params;
  const result = jwtToken && verifyToken(jwtToken);

  if (!result) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  
  const manager = await Manager.findOne({ email: result.email });
  const costumer = manager.costumers.filter((item) => item._id == costumerID);
  return {
    props: {
      data: JSON.stringify(costumer[0]),
    },
  };
}
