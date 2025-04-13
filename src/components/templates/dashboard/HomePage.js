import { Card as CnCard } from "@/components/ui/card";
import { useSelector } from "react-redux";
import text from "../../constants/text";
import Card from "../../modules/Card";

function HomePage({ costumers }) {
  const lang = useSelector((state) => state.language.lang);
  console.log(costumers)
  return (
    <>
      {costumers.length ? (
        costumers.map((costumer) => <Card key={costumer._id} {...costumer} />)
      ) : (
        <CnCard className="text-center">{text.no_costumer[lang]}</CnCard>
      )}
    </>
  );
}

export default HomePage;
