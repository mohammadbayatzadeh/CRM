import text from "@/src/components/constants/text";
import { verifyToken } from "@/src/utils/functions";
import { useSelector } from "react-redux";

function Home() {
  const lang = useSelector((state) => state.language.lang);
  return (
    <>
      <h2>{text.welcome[lang]}</h2>
      <br />
      <h3 className="">{text.homePage_text[lang]}</h3>
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
