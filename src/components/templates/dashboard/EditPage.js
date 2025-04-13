import { Button } from "@/components/ui/button";
import Form from "@/src/components/modules/Form";
import { helpers } from "@/src/utils/functions";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import text from "../../constants/text";

function EditPage({ data }) {
  const [form, setForm] = React.useState({});
  const lang = useSelector((state) => state.language.lang);

  const router = useRouter();

  const { costumerID } = router.query;

  React.useEffect(() => {
    setForm(data);
  }, []);

  const cancelHandler = () => {
    setForm({
      firstName_EN: "",
      firstName_FA: "",
      lastName_EN: "",
      lastName_FA: "",
      email: "",
      birthday: "",
      phone: "",
      city: "",
      products: [],
    });
    router.push("/");
  };

  const saveHandler = async () => {
    if (!helpers.isFormEmpty(form)) {
      await axios
        .patch(`/api/costumer/${costumerID}`, { data: form })
        .then(() => {
          router.push("/");
        })
        .catch(() => {});
    }
  };

  return (
    <div className="w-full flex-col flex mb-2">
      <h1>{text.edit_page[lang]}</h1>
      {form && <Form form={form} setForm={setForm} />}
      <div className="flex w-full justify-between">
        <Button onClick={cancelHandler} variant="destructive">
          {text.cancel[lang]}
        </Button>
        <Button onClick={saveHandler}>{text.save[lang]}</Button>
      </div>
    </div>
  );
}

export default EditPage;
