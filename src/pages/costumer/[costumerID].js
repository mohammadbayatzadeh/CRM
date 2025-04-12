import CostumerDetails from "@/src/components/templates/dashboard/CostumerDetails";
import Manager from "@/src/models/Manager";
import { verifyToken } from "@/src/utils/functions";
import Head from "next/head";

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
