import Card from "../../modules/Card";
import { useSelector } from "react-redux";
import text from "../../constants/text";
import { Card as CnCard } from "@/components/ui/card";

function HomePage({ costumers }) {
  const lang = useSelector((state) => state.language.lang);
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
