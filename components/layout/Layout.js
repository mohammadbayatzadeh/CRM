import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>CRM PANEL</h1>
        <span onClick={() => console.log("KOS toom er")}>
          <p className={styles.none}>+</p>
          <p className={styles.text}>Add costumer</p>
        </span>
      </header>
      <div className={styles.container}>{children}</div>
      <footer className={styles.footer}>
        <h5>Next Project | CRM Project &copy;</h5>
      </footer>
    </div>
  );
}

export default Layout;
