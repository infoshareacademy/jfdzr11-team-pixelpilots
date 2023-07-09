import { Cards } from "../index";
import styles from "./MainPanel.module.css";

const MainPanel = () => {
  return (
    <div className={styles.wrapper}>
      <Cards />
    </div>
  );
};

export default MainPanel;
