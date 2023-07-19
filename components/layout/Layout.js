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

function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const themeHandler = () => {
    theme === "dark" ? dispatch(lightMode()) : dispatch(darkMode());
  };

  useEffect(() => {
    AuthHandler();
  }, []);
  const logOutHandler = () => {
    axios
      .get("/api/auth/logout")
      .then((res) => {
        Toast(res.data.message, "success");
        console.log(res.data);
        AuthHandler();
      })
      .catch(
        (err) => (
          console.log(err.response), Toast(err.response.data.message, "error")
        )
      );
  };
  const AuthHandler = () => {
    axios
      .get("/api/manager")
      .then((res) => setIsLoggedIn(true))
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
            <button className={styles.button} onClick={()=>router.replace('/login')}>login</button>
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
