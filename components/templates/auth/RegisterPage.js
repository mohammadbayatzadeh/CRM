import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

//styles
import styles from "./AuthPage.module.css";

//comps
import FormInput from "../../elements/FormInput";
import { Toast } from "../../elements/Toast";

//redux
import { useSelector } from "react-redux";

//constants
import text from "../../constants/text";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const lang = useSelector((state) => state.language.lang);
  const router = useRouter();

  const saveHandler = async () => {
    axios
      .post("/api/auth/register", {
        email,
        password,
      })
      .then((res) => {
        Toast(`${res.data.message}`, "success");
        router.push("/");
      })
      .catch((err) => {
        Toast(`${err.response.data.message}`, "error");
      });
  };

  return (
    <div className={styles.container}>
      <h3>{text.register_form[lang]}</h3>
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
      <button onClick={saveHandler} className={styles.save}>
        {text.register[lang]}
      </button>
      <p>
        {text.have_account[lang]}? <Link href="/login">{text.login[lang]}</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
