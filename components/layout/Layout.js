import Link from "next/link";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          CRM PANEL
        </Link>
        {router.pathname === "/add-costumer" || (
          <Link className={styles.button} href="/add-costumer">
            <p className={styles.none}>+</p>
            <p className={styles.text}>Add costumer</p>
          </Link>
        )}
      </header>
      <div className={styles.container}>{children}</div>
      <footer className={styles.footer}>
        <h5>Next Project | CRM Project &copy;</h5>
      </footer>
    </div>
  );
}

export default Layout;
