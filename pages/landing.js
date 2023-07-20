//functions
import { verifyToken } from "@/utils/functions";

function Home() {
  return <h2>Welcome to CRM Panel</h2>;
}

export default Home;

export async function getServerSideProps(context) {
  const { jwtToken } = context.req.cookies;

  const result = verifyToken(jwtToken);

  if (result) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
