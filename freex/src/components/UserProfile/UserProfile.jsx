import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ContactUser from "./ContactUser/ContactUser";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import ProfileList from "./ProfileList/ProfileList";
import Skills from "./Skills/Skills";
import styles from "./UserProfile.module.css";
// import { user } from "./mockUser";
import useAuth from "../Context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const currentUserID = currentUser.uid;
  const docRef = doc(db, "users", currentUserID);

  const [user, setUser] = useState(null);

  useEffect(() => {
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("Document data:", userData);
        setUser(userData);
      } else {
        console.log("No such document!");
        setUser(null);
      }
    });
  }, []);

  const editHandler = () => {
    navigate("/edytujprofil");
  };

  const addHandler = () => {
    navigate("/edytujprofil");
  };

  if (!user) {
    return (
      <div className={styles.message_wrapper}>
        <p></p>
        <button
          className={styles.message_button}
          type="button"
          onClick={addHandler}
        >
          Dodaj dane do profilu
        </button>
        <p className={styles.message_caption}>
          Dodaj dane do profilu, aby zaprezentowac się innym użytkownikom.
          <br />
          Dane, które dodasz, będą widoczne dla innych użytkowników.
        </p>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.message_wrapper}>
          <button
            className={styles.message_button}
            type="button"
            onClick={editHandler}
          >
            Edytuj swoje dane
          </button>
          <p className={styles.message_caption}>
            Dane, które dodasz do profilu, będą widoczne dla innych użytkowników
          </p>
        </div>

        <div className={styles.user_profile}>
          <GeneralInfo
            name={user.userName}
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
            header="Edukacja / Kwalifikacje"
          />

          <ContactUser />
        </div>
      </>
    );
  }
};

export default UserProfile;
