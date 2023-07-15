import styles from "./ChipsFilter.module.css";

const ChipsFilter = ({ children, type, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default ChipsFilter;
