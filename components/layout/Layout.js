import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../redux/theme/themeAction";
import Moon from "../icons/Moon";
import Sun from "../icons/Sun";
import axios from "axios";
import { Toast } from "../elements/Toast";
import { seperateName } from "@/utils/functions";

function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const themeHandler = () => {
    theme === "dark" ? dispatch(lightMode()) : dispatch(darkMode());
  };

  useEffect(() => {
    AuthHandler();
  }, [router.pathname]);

  const logOutHandler = () => {
    axios
      .get("/api/auth/logout")
      .then((res) => {
        setName("");
        router.push("/login");
        Toast(res.data.message, "success");
        AuthHandler();
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
    <div id={[theme]}>
      <div className={styles.body}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            CRM PANEL
          </Link>
          <div onClick={themeHandler} className={styles.icon}>
            {theme === "dark" ? <Sun /> : <Moon />}
            {name && ` Welcome ${seperateName(name)}`}
          </div>
          {isLoggedIn ? (
            <>
              {router.pathname === "/add-costumer" || (
                <Link className={styles.button} href="/add-costumer">
                  <p className={styles.none}>+</p>
                  <p className={styles.text}>Add costumer</p>
                </Link>
              )}
              <button onClick={logOutHandler} className={styles.button}>
                log out
              </button>
            </>
          ) : (
            <>
              {router.pathname === "/login" || (
                <button
                  className={styles.button}
                  onClick={() => router.replace("/login")}
                >
                  login
                </button>
              )}
              {router.pathname === "/register" || (
                <button
                  className={styles.button}
                  onClick={() => router.replace("/register")}
                >
                  register
                </button>
              )}
            </>
          )}
        </header>
        <div className={styles.container} id={[theme]}>
          {children}
        </div>
        <footer className={styles.footer}>
          <h5>Next Project | CRM Project &copy;</h5>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
