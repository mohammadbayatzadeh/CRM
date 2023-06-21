import EditPage from "@/components/templates/EditPage";
import Costumer from "@/models/Costumer";
import Head from "next/head";

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
