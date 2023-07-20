import Head from "next/head";
import CostumerDetails from "@/components/templates/CostumerDetails";

//models
import Manager from "@/models/Manager";

//functions
import { verifyToken } from "@/utils/functions";

function CostumerDetail({ data }) {
  const costumerData = JSON.parse(data);
  return (
    <>
      <Head>
        <title>
          {costumerData.firstName} {costumerData.lastName} Details
        </title>
      </Head>
      <CostumerDetails data={costumerData} />
    </>
  );
}

export default CostumerDetail;

export async function getServerSideProps(context) {
  try {
    const { costumerID } = context.params;
    const { jwtToken } = context.req.cookies;
    const result = verifyToken(jwtToken);
    const manager = await Manager.findOne({ email: result.email });
    const costumer = manager.costumers.filter(
      (costumer) => costumer._id == costumerID
    );

    return {
      props: {
        data: JSON.stringify(costumer[0]),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
