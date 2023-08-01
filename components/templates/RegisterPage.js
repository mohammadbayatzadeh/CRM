import { useState } from "react";
import Link from "next/link";
import axios from "axios";

//styles
import styles from "./RegisterPage.module.css";

//comps
import FormInput from "../elements/FormInput";
import { Toast } from "../elements/Toast";
import { useRouter } from "next/router";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <h3>Register Form</h3>
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
      <button onClick={saveHandler} className={styles.save}>
        Register
      </button>
      <p>
        have Account? <Link href="/login">login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
