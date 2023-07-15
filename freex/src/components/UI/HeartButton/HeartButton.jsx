import { useState } from "react";
import styles from "./HeartButton.module.css";
import heartIcon from "../../../../public/HeartButton/heart-icon.svg";
import heartIconHovered from "../../../../public/HeartButton/heart-icon-full.svg";

const HeartButton = ({ className, isFavorite, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let isFilled;

  if (isHovered && isFavorite) {
    isFilled = false;
  } else if (isHovered && !isFavorite) {
    isFilled = true;
  } else if (!isHovered && isFavorite) {
    isFilled = true;
  } else if (!isHovered && !isFavorite) {
    isFilled = false;
  }

  return (
    <button
      onClick={onClick}
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
