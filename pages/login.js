import LoginPage from "@/components/templates/LoginPage";

//functions
import { verifyToken } from "@/utils/functions";

function Login() {
  return <LoginPage />;
}

export default Login;

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
