import EditPage from "@/src/components/templates/dashboard/EditPage";
import Manager from "@/src/models/Manager";
import { verifyToken } from "@/src/utils/functions";
import Head from "next/head";
import { useSelector } from "react-redux";

function edit({ data }) {
  const costumerData = JSON.parse(data);
  const lang = useSelector((state) => state.language.lang);

  return (
    <>
      <Head>
        <title>
          {lang == "en"
            ? ` Edit ${costumerData.firstName_EN} ${costumerData.lastName_EN}`
            : ` ویرایش ${costumerData.firstName_FA} ${costumerData.lastName_FA}`}
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
