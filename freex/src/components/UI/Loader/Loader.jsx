import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = (isLoading) => {
  return (
    <div className={styles.loader_wrapper}>
      <ClipLoader
        color="#33BBFF"
        loading={isLoading}
        size={60}
        speedMultiplier={0.5}
      />
      <p className={styles.p}>Ładowanie strony...</p>
    </div>
  );
};

export default Loader;
