import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

//comps
import { Toast } from "../elements/Toast";
import FormInput from "../elements/FormInput";

//styles
import styles from "./RegisterPage.module.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <h3>login Form</h3>
      <FormInput
        name="email"
        type="email"
        value={email}
        label="Email"
        onchange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        name="password"
        type="password"
        value={password}
        label="Password"
        onchange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginHandler} className={styles.save}>
        Login
      </button>
      <p>
        Dont have Account? <Link href="/register">register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
