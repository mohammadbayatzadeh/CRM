import { Button } from "@/components/ui/button";
import { helpers } from "@/src/utils/functions";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import text from "../../constants/text";
import { Loader } from "../../elements/Loader";
import Form from "../../modules/Form";

function AddCostumerPage() {
  const lang = useSelector((state) => state.language.lang);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName_EN: "",
    firstName_FA: "",
    lastName_EN: "",
    lastName_FA: "",
    email: "",
    phone: "",
    birthday: "",
    city_EN: "",
    city_FA: "",
    products: [],
  });

  const router = useRouter();

  const cancelHandler = () => {
    setForm({
      firstName_EN: "",
      firstName_FA: "",
      lastName_EN: "",
      lastName_FA: "",
      email: "",
      phone: "",
      birthday: "",
      city_EN: "",
      city_FA: "",
      products: [],
    });
    router.push("/");
  };

  const saveHandler = async () => {
    if (!helpers.isFormEmpty(form)) {
      setLoading(true);
      axios
        .post("/api/costumer", { data: form })
        .then(() => {
          toast(`${form.firstName_EN} createad`);
          router.push("/");
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="w-full flex-col flex mb-2">
      <h1 className="text-2xl">{text.add_costumer[lang]}</h1>
      <Form form={form} setForm={setForm} />
      <div className="flex w-full justify-between">
        <Button onClick={cancelHandler} variant="destructive">
          {text.delete[lang]}
        </Button>
        <Button onClick={saveHandler} disabled={loading}>
          {loading ? <Loader /> : text.save[lang]}
        </Button>
      </div>
    </div>
  );
}

export default AddCostumerPage;
