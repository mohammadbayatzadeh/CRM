import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

//comps
import Form from "@/src/components/modules/Form";

//styles
import styles from "./EditPage.module.css";

//redux
import { useSelector } from "react-redux";

//constants
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
    await axios
      .patch(`/api/costumer/${costumerID}`, { data: form })
      .then(() => {
        router.push("/");
      })
      .catch(() => {});
  };

  return (
    <div className={styles.container}>
      <h3>{text.edit_page[lang]}</h3>
      {form && <Form form={form} setForm={setForm} />}
      <div className={styles.buttons}>
        <button onClick={cancelHandler} className={styles.cancel}>
          {text.cancel[lang]}
        </button>
        <button onClick={saveHandler} className={styles.save}>
          {text.save[lang]}
        </button>
      </div>
    </div>
  );
}

export default EditPage;
