import Card from "../../modules/Card";
import { useSelector } from "react-redux";
import text from "../../constants/text";

function HomePage({ costumers }) {
  const lang = useSelector((state) => state.language.lang);
  return (
    <>
      {costumers.length ? (
        costumers.map((costumer) => <Card key={costumer._id} {...costumer} />)
      ) : (
        <h2 className="text-xl">{text.no_costumer[lang]}</h2>
      )}
    </>
  );
}

export default HomePage;
