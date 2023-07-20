import Form from "@/components/modules/Form";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import styles from "./EditPage.module.css";

function EditPage({ data }) {
  const [form, setForm] = React.useState({});

  const router = useRouter();

  const { costumerID } = router.query;

  React.useEffect(() => {
    setForm(data);
  }, []);

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
      .patch(`/api/costumer/${costumerID}`, { data: form })
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
      <h3>Edit Form</h3>
      {form && <Form form={form} setForm={setForm} />}
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

export default EditPage;
