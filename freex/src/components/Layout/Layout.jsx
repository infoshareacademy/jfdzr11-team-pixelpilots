import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className={styles.app}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.page_content}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
