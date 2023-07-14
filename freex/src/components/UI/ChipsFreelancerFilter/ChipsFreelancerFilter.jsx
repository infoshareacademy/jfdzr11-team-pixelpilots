import styles from "./ChipsFreelancerFilter.module.css";

const ChipsFreelancerFilter = ({ children, type, onClick, className }) => {
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

export default ChipsFreelancerFilter;
