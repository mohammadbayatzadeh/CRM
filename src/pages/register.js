//temps
import RegisterPage from "@/src/components/templates/auth/RegisterPage";

//functions
import { verifyToken } from "@/src/utils/functions";

function Register() {
  return <RegisterPage />;
}

export default Register;

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
