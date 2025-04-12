import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//comps
import { Toast } from "../elements/Toast";

//funs
import { helpers } from "@/src/utils/functions";

//redux
import { useDispatch, useSelector } from "react-redux";
import { ENLanguage, FALanguage } from "../redux/language/LangSlice";
import { darkMode, lightMode } from "../redux/theme/ThemeSlice";

//icons
import { IoMoon, IoSunny } from "react-icons/io5";

//styles
import styles from "./Layout.module.css";

//constants
import { Irancell } from "@/src/utils/Fonts";
import text from "../constants/text";

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
            <span onClick={themeHandler} className={styles.icon}>
              {theme === "dark" ? (
                <IoSunny style={{ color: "yellow" }} />
              ) : (
                <IoMoon style={{ color: "black" }} />
              )}
            </span>
            <span className={styles.welcome}>
              {name && ` ${text.welcome[lang]} ${helpers.seperateName(name)}`}
            </span>
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
