import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { helpers } from "@/src/utils/functions";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import text from "../../constants/text";
import FormInput from "../../elements/FormInput";
import { Loader } from "../../elements/Loader";

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
      return toast("please fill all inputs");
    }
    setLoading(true);
    axios
      .post("/api/auth/login", form)
      .then((res) => {
        router.push("/");
        toast(`${res.data.message}`);
      })
      .catch((err) => {
        toast(`${err.response.data.message}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card
      className={cn(
        "w-full md:w-4/5 mx-auto p-5 text-center flex flex-col items-center"
      )}
    >
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
      <Button
        onClick={loginHandler}
        className={buttonVariants({ variant: "outline" })}
      >
        {loading ? (
          <Loader />
        ) : (
          <span className="text-foreground">{text.login[lang]}</span>
        )}
      </Button>
      <p>
        {text.havent_account[lang]}?{" "}
        <Link href="/register" className="!text-green-600 px-1">
          {text.register[lang]}
        </Link>
      </p>
    </Card>
  );
}

export default LoginPage;
