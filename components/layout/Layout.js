import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//comps
import { Toast } from "../elements/Toast";

//funs
import { helpers } from "@/utils/functions";

//redux
import { darkMode, lightMode } from "../redux/theme/themeAction";
import { ENLanguage, FALanguage } from "../redux/language/LanguageAction";
import { useDispatch, useSelector } from "react-redux";

//icons
import Sun from "../icons/Sun";
import Moon from "../icons/Moon";

//styles
import styles from "./Layout.module.css";

//constants
import text from "../constants/text";
import { Irancell } from "@/utils/Fonts";

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
      id={[theme]}
      dir={lang === "en" ? "ltr" : "rtl"}
      className={Irancell.className}
    >
      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.headerSection}>
            <Link href="/" className={styles.logo}>
              {text.logo[lang]}
            </Link>
            <span style={{ cursor: "pointer" }} onClick={langHandler}>
              ({text.lang[lang]})
            </span>
            <div className={styles.icon}>
              <span onClick={themeHandler}>
                {theme === "dark" ? <Sun /> : <Moon />}
              </span>
              {name && ` ${text.welcome[lang]} ${helpers.seperateName(name)}`}
            </div>
          </div>
          <div className={styles.headerSection}>
            {isLoggedIn ? (
              <>
                {router.pathname === "/add-costumer" || (
                  <Link className={styles.button} href="/add-costumer">
                    <p className={styles.none}>+</p>
                    <p className={styles.text}>{text.add_costumer[lang]}</p>
                  </Link>
                )}
                <button onClick={logOutHandler} className={styles.button}>
                  {text.logout[lang]}
                </button>
              </>
            ) : (
              <>
                {router.pathname === "/login" || (
                  <Link className={styles.button} href="/login">
                    {text.login[lang]}
                  </Link>
                )}
                {router.pathname === "/register" || (
                  <Link className={styles.button} href="/register">
                    {text.register[lang]}
                  </Link>
                )}
              </>
            )}
          </div>
        </header>
        <div className={styles.container} id={[theme]}>
          {children}
        </div>
        <footer className={styles.footer}>
          <h5>{text.footer[lang]}</h5>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
