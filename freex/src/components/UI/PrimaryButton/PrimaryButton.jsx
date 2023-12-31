import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({ children, onClick, className, type }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
