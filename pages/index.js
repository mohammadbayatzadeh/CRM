import HomePage from "@/components/templates/HomePage";

//model
import Manager from "@/models/Manager";

//functions
import connectDB from "@/utils/connectDB";
import { verifyToken } from "@/utils/functions";

function Home({ costumers }) {
  return <HomePage costumers={costumers} />;
}

export default Home;

export async function getServerSideProps(context) {
  const { jwtToken } = context.req.cookies;
  try {
    await connectDB();
    const result = verifyToken(jwtToken);
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
