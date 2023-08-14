import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

//styles
import styles from "./AddCostumerPage.module.css";

//comps
import Form from "../modules/Form";
import { Toast } from "../elements/Toast";

//redux
import { useSelector } from "react-redux";

//constants
import text from "../constants/text";

function AddCostumerPage() {
  const lang = useSelector((state) => state.language.lang);
  const [form, setForm] = useState({
    firstName_EN: "",
    firstName_FA: "",
    lastName_EN: "",
    lastName_FA: "",
    email: "",
    phone: "",
    city: "",
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
      city: "",
      products: [],
    });
    router.push("/");
  };

  const saveHandler = async () => {
    form.firstName_EN &&
      form.firstName_FA &&
      form.lastName_EN &&
      form.lastName_FA &&
      form.email &&
      form.products[0] &&
      form.products[0].name &&
      (await axios
        .post("/api/costumer", { data: form })
        .then((res) => {
          Toast(`${form.firstName_EN} createad`, "success");
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        }));
  };

  return (
    <div className={styles.container}>
      <h4>{text.add_costumer[lang]}</h4>
      <Form form={form} setForm={setForm} />
      <div className={styles.buttons}>
        <button onClick={cancelHandler} className={styles.cancel}>
          {text.delete[lang]}
        </button>
        <button onClick={saveHandler} className={styles.save}>
          {text.save[lang]}
        </button>
      </div>
    </div>
  );
}

export default AddCostumerPage;
