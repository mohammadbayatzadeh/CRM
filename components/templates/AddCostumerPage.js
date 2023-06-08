import { useState } from "react";
import Form from "../modules/Form";
import styles from "./AddCostumerPage.module.css";
import { useRouter } from "next/router";
import axios from "axios";

function AddCostumerPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    products: [],
  });

  const router = useRouter();

  const cancelHandler = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      products: [],
    });
    router.push("/");
  };

  const saveHandler = async () => {
    await axios
      .post("/api/costumer", { data: form })
      .then((res) => {
        router.push("/");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className={styles.container}>
      <h4>Add Costumer</h4>
      <Form form={form} setForm={setForm} />
      <div className={styles.buttons}>
        <button onClick={cancelHandler} className={styles.cancel}>
          Cancel
        </button>
        <button onClick={saveHandler} className={styles.save}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddCostumerPage;
