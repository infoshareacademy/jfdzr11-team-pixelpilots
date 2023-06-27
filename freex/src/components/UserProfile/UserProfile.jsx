import ContactUser from "./ContactUser/ContactUser";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import ProfileList from "./ProfileList/ProfileList";
import Skills from "./Skills/Skills";
import styles from "./UserProfile.module.css";
import { user } from "./mockUser";

const UserProfile = () => {
  return (
    <div className={styles.user_profile}>
      <GeneralInfo
        name={user.name}
        role={user.role}
        imgURL={user.imgURL}
        rating={user.rating}
        opinionsNumber={user.opinionsNumber}
        description={user.description}
        hourlyRate={user.hourlyRate}
        joiningDate={user.joingDate}
      ></GeneralInfo>

      <Skills skills={user.skills}></Skills>

      <ProfileList
        className={styles.experience}
        listData={user.experience}
        header="Doświadczenie"
      />

      <ProfileList
        className={styles.education}
        listData={user.education}
        header="Edukacja"
      />

      <ContactUser />
    </div>
  );
};

export default UserProfile;
