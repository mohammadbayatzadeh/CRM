import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

//styles
import styles from "./AuthPage.module.css";

//comps
import FormInput from "../../elements/FormInput";
import { Toast } from "../../elements/Toast";

//redux
import { useSelector } from "react-redux";

//constants
import { helpers } from "@/src/utils/functions";
import text from "../../constants/text";

//spinner
import { PulseLoader } from "react-spinners";

function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const router = useRouter();

  const saveHandler = async () => {
    if (helpers.isFormEmpty(form)) {
      return Toast("please fill all inputs", "error");
    }
    setLoading(true);
    axios
      .post("/api/auth/register", form)
      .then((res) => {
        Toast(`${res.data.message}`, "success");
        router.push("/");
      })
      .catch((err) => {
        Toast(`${err.response.data.message}`, "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <h3>{text.register_form[lang]}</h3>
      <FormInput
        name="email"
        type="email"
        label={text.email[lang]}
        form={form}
        setForm={setForm}
      />
      <FormInput
        name="password"
        type="password"
        label={text.password[lang]}
        form={form}
        setForm={setForm}
      />
      <button onClick={saveHandler} className={styles.save}>
        {loading ? <PulseLoader color="green" /> : text.register[lang]}
      </button>
      <p>
        {text.have_account[lang]}? <Link href="/login">{text.login[lang]}</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
