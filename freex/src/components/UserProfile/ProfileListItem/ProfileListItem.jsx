import styles from "./ProfileListItem.module.css";

const ProfileListItem = ({
  logoURL,
  title,
  subtitle,
  startingTime,
  endingTime,
}) => {
  return (
    <li key="todolater" className={styles.list_item}>
      <img className={styles.list_item_logo} src={logoURL}></img>
      <div>
        <h5 className={styles.list_item_title}>{title}</h5>
        <p className={styles.list_item_subtitle}>{subtitle}</p>
        <p className={styles.list_item_timespan}>
          {startingTime}-{endingTime}
        </p>
      </div>
    </li>
  );
};

export default ProfileListItem;
