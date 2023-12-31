import styles from "./ProfileList.module.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import ProfileListItem from "../ProfileListItem/ProfileListItem";
import { v4 as uuid } from "uuid";

const ProfileList = ({ className, header, listData }) => {
  return (
    <ProfileCard className={className}>
      <h4 className={styles.list_header}>{header}</h4>
      <ul className={styles.list}>
        {listData.map((item) => (
          <ProfileListItem
            key={uuid()}
            logoURL={item.logo}
            title={item.title}
            subtitle={item.subtitle}
            startingTime={item.start}
            endingTime={item.end}
          />
        ))}
      </ul>
      <div className={styles.button_wrapper}></div>
    </ProfileCard>
  );
};

export default ProfileList;
