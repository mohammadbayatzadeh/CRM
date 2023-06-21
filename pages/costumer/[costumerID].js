import CostumerDetails from "@/components/templates/CostumerDetails";
import Costumer from "@/models/Costumer";
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
    const costumer = await Costumer.findById(costumerID);

    return {
      props: {
        data: JSON.stringify(costumer),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
