//temps
import LoginPage from "@/components/templates/auth/LoginPage";

//functions
import { verifyToken } from "@/utils/functions";

function Login() {
  return <LoginPage />;
}

export default Login;

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
