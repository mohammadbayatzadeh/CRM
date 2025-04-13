//temps
import HomePage from "@/src/components/templates/dashboard/HomePage";

//model
import Manager from "@/src/models/Manager";

//functions
import connectDB from "@/src/utils/connectDB";
import { verifyToken } from "@/src/utils/functions";

function Home({ costumers }) {
  console.log(costumers)
  return <HomePage costumers={costumers} />;
}

export default Home;

export async function getServerSideProps(context) {
  const { jwtToken } = context.req.cookies;
  try {
    await connectDB();
    const result = jwtToken && verifyToken(jwtToken);
    const manager = await Manager.findOne({ email: result.email });
    return {
      props: {
        costumers: JSON.parse(JSON.stringify(manager.costumers)),
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/landing",
      },
    };
  }
}
