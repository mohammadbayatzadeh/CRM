//temps
import RegisterPage from "@/components/templates/auth/RegisterPage";

//functions
import { verifyToken } from "@/utils/functions";

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
