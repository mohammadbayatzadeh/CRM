//functions
import { verifyToken } from "@/utils/functions";

function Home() {
  return (
    <>
      <h2>Welcome to CRM Panel</h2>
      <br />
      <h3>
        To manage your costumers, please register or login to your account.
      </h3>
    </>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const { jwtToken } = context.req.cookies;

  const result = jwtToken && verifyToken(jwtToken);

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
