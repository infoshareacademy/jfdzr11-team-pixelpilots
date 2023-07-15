import styles from "./SecondaryButton.module.css";

const SecondaryButton = ({ children, onClick, className, type }) => {
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

export default SecondaryButton;
