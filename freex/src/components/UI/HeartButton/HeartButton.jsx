import { useState } from "react";
import styles from "./HeartButton.module.css";
import heartIcon from "../../../../public/HeartButton/heart-icon.svg";
import heartIconHovered from "../../../../public/HeartButton/heart-icon-full.svg";

const HeartButton = ({ className }) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleMouseEnter = () => {
    setIsFilled(true);
  };

  const handleMouseLeave = () => {
    setIsFilled(false);
  };

  return (
    <button
      className={`${styles.button} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className={styles.icon}
        src={isFilled ? heartIconHovered : heartIcon}
      />
    </button>
  );
};

export default HeartButton;
