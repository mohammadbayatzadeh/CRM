import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

//comps
import { Toast } from "../../elements/Toast";
import FormInput from "../../elements/FormInput";

//styles
import styles from "./AuthPage.module.css";

//redux
import { useSelector } from "react-redux";

//constants
import text from "../../constants/text";

//spinner
import { PulseLoader } from "react-spinners";
import { isFormEmpty } from "@/utils/functions";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const router = useRouter();

  const loginHandler = async () => {
    if (isFormEmpty(form)) {
      return Toast("please fill all inputs", "error");
    }
    setLoading(true);
    axios
      .post("/api/auth/login", form)
      .then((res) => {
        router.push("/");
        Toast(`${res.data.message}`, "success");
      })
      .catch((err) => {
        Toast(`${err.response.data.message}`, "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <h3>{text.login_form[lang]}</h3>
      <FormInput
        name="email"
        type="email"
        label={text.email[lang]}
        form={form}
        setFrom={setForm}
      />
      <FormInput
        name="password"
        type="password"
        label={text.password[lang]}
        form={form}
        setFrom={setForm}
      />
      <button onClick={loginHandler} className={styles.save}>
        {loading ? <PulseLoader color="green" /> : text.login[lang]}
      </button>
      <p>
        {text.havent_account[lang]}?{" "}
        <Link href="/register">{text.register[lang]}</Link>
      </p>
    </div>
  );
}

export default LoginPage;
