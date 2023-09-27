import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

//comps
import { Toast } from "../elements/Toast";
import FormInput from "../elements/FormInput";

//styles
import styles from "./AuthPage.module.css";

//redux
import { useSelector } from "react-redux";

//constants
import text from "../constants/text";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const lang = useSelector((state) => state.language.lang);
  const router = useRouter();

  const loginHandler = async () => {
    axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        router.push("/");
        Toast(`${res.data.message}`, "success");
      })
      .catch((err) => {
        Toast(`${err.response.data.message}`, "error");
      });
  };

  return (
    <div className={styles.container}>
      <h3>{text.login_form[lang]}</h3>
      <FormInput
        name="email"
        type="email"
        value={email}
        label={text.email[lang]}
        onchange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        name="password"
        type="password"
        value={password}
        label={text.password[lang]}
        onchange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginHandler} className={styles.save}>
        {text.login[lang]}
      </button>
      <p>
        {text.havent_account[lang]}?{" "}
        <Link href="/register">{text.register[lang]}</Link>
      </p>
    </div>
  );
}

export default LoginPage;
