import Link from "next/link";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../redux/theme/themeAction";
import Moon from "../icons/Moon";
import Sun from "../icons/Sun";

function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const themeHandler = () => {
    theme === "dark" ? dispatch(lightMode()) : dispatch(darkMode());
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
          {router.pathname === "/add-costumer" || (
            <Link className={styles.button} href="/add-costumer">
              <p className={styles.none}>+</p>
              <p className={styles.text}>Add costumer</p>
            </Link>
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
