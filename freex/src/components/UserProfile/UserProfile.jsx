import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import ProfileCard from "./ProfileCard/ProfileCard";
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

      {/* <div className="opinions">opinions</div> -tego na razie nie robię - zbyt skomplikowane */}

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

      <div className={`${styles.contact}`}>
        <h5 className={styles.contact_header}>
          Skontaktuj się z freelancerem w sprawie swojego projektu
        </h5>
        <PrimaryButton>Informacje kontaktowe</PrimaryButton>
      </div>
      {/* <div className={styles.look}>
        <button className={styles.look_button}>
          Przeglądaj innych freelancerów
        </button>
      </div> */}
    </div>
  );
};

export default UserProfile;
