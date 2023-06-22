import styles from "./PrimaryButton.module.css";
import PropTypes from "prop-types";

const PrimaryButton = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.any,
};

export default PrimaryButton;
