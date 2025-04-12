//comps
import Card from "../../modules/Card";

//redux
import { useSelector } from "react-redux";

//constants
import text from "../../constants/text";

function HomePage({ costumers }) {
  const lang = useSelector((state) => state.language.lang);
  return (
    <>
      {costumers.length ? (
        costumers.map((costumer) => <Card key={costumer._id} {...costumer} />)
      ) : (
        <h2>{text.no_costumer[lang]}</h2>
      )}
    </>
  );
}

export default HomePage;
