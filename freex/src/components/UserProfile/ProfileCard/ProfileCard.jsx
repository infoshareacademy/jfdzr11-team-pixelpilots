import styles from "./ProfileCard.module.css";

const ProfileCard = ({ className, children }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default ProfileCard;
