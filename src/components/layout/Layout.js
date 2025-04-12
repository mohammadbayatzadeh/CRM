import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Irancell } from "@/src/utils/Fonts";
import { helpers } from "@/src/utils/functions";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import text from "../constants/text";
import { Toast } from "../elements/Toast";
import { ENLanguage, FALanguage } from "../redux/language/LangSlice";
import { darkMode, lightMode } from "../redux/theme/ThemeSlice";

function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const theme = useSelector((state) => state.theme.theme);
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const router = useRouter();

  const themeHandler = () => {
    theme === "dark" ? dispatch(lightMode()) : dispatch(darkMode());
  };
  const langHandler = () => {
    lang === "en" ? dispatch(FALanguage()) : dispatch(ENLanguage());
  };

  useEffect(() => {
    AuthHandler();
  }, [router.pathname]);

  const logOutHandler = () => {
    axios
      .get("/api/auth/logout")
      .then((res) => {
        setName("");
        AuthHandler();
        Toast(res.data.message, "success");
        router.push("/login");
      })
      .catch((err) => Toast(err.response.data.message, "error"));
  };

  const AuthHandler = () => {
    axios
      .get("/api/manager")
      .then((res) => {
        setIsLoggedIn(true);
        setName(res.data.data);
      })
      .catch((err) => setIsLoggedIn(false));
  };

  return (
    <div
      dir={lang === "en" ? "ltr" : "rtl"}
      className={`${Irancell.className} ${
        theme === "dark" ? "dark" : "light"
      } bg-background text-foreground py-5 h-[100dvh] overflow-y-scroll`}
    >
      <div className="mx-auto w-[95dvw] md:w-[85dvw] lg:w-[70dvw] h-full flex flex-col items-center justify-between  bg-background text-foreground">
        <header className="flex justify-between items-center w-full py-2  mb-12">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-3xl">
              {text.logo[lang]}
            </Link>
            <span style={{ cursor: "pointer" }} onClick={langHandler}>
              ({text.lang[lang]})
            </span>
            <span
              onClick={themeHandler}
              className="transform-y-2 cursor-pointer text-2xl"
            >
              {theme === "dark" ? (
                <IoSunny style={{ color: "yellow" }} />
              ) : (
                <IoMoon style={{ color: "black" }} />
              )}
            </span>
            <span>
              {name && ` ${text.welcome[lang]} ${helpers.seperateName(name)}`}
            </span>
          </div>
          <div className="flex gap-2">
            {isLoggedIn ? (
              <>
                {router.pathname === "/add-costumer" || (
                  <Link
                    href="/add-costumer"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <p className="hidden">+</p>
                    <p>{text.add_costumer[lang]}</p>
                  </Link>
                )}
                <Button onClick={logOutHandler} >{text.logout[lang]}</Button>
              </>
            ) : (
              <>
                {router.pathname === "/login" || (
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    {text.login[lang]}
                  </Link>
                )}
                {router.pathname === "/register" || (
                  <Link
                    href="/register"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    {text.register[lang]}
                  </Link>
                )}
              </>
            )}
          </div>
        </header>
        <div className=" w-full mb-auto">{children}</div>
        <Card className={cn("w-full text-center")}>
          <h5>{text.footer[lang]}</h5>
        </Card>
      </div>
    </div>
  );
}

export default Layout;
