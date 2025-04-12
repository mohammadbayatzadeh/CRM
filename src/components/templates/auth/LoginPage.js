import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

//comps
import { Toast } from "../../elements/Toast";

//redux
import { useSelector } from "react-redux";

//constants
import text from "../../constants/text";

//spinner
import { PulseLoader } from "react-spinners";

//helpers
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { helpers } from "@/src/utils/functions";
import FormInput from "../../elements/FormInput";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const router = useRouter();

  const loginHandler = async () => {
    if (helpers.isFormEmpty(form)) {
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
    <Card className={cn("w-full md:w-4/5 mx-auto p-5 text-center flex flex-col items-center")}>
      <h3>{text.login_form[lang]}</h3>
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
      <Button onClick={loginHandler}>
        {loading ? <PulseLoader color="green" /> : text.login[lang]}
      </Button>
      <p>
        {text.havent_account[lang]}?{" "}
        <Link href="/register" className=" px-1">
          {text.register[lang]}
        </Link>
      </p>
    </Card>
  );
}

export default LoginPage;
