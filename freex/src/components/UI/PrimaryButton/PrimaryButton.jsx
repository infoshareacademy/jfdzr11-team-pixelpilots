import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;
