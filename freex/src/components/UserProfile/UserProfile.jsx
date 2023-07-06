import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactUser from "./ContactUser/ContactUser";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import ProfileList from "./ProfileList/ProfileList";
import Skills from "./Skills/Skills";
import styles from "./UserProfile.module.css";
import useAuth from "../Context/AuthContext";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import Opinions from "./Opinions/Opinions";
import Loader from "../UI/Loader/Loader";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const currentUserID = currentUser.uid;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "users", userId);
    try {
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser(userData);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      toast.error("Pojawił się błąd. Spróbuj później. Error: " + e);
    }
  }, [userId]);

  const editHandler = () => {
    navigate("/edytujprofil");
  };

  const addHandler = () => {
    navigate("/edytujprofil");
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  if (!user && currentUserID === userId) {
    return (
      <div className={styles.message_wrapper}>
        <p></p>
        <PrimaryButton
          className={styles.message_button}
          type="button"
          onClick={addHandler}
        >
          Dodaj dane do profilu
        </PrimaryButton>
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
        {currentUserID === userId && (
          <div className={styles.message_wrapper}>
            <PrimaryButton
              className={styles.message_button}
              type="button"
              onClick={editHandler}
            >
              Edytuj swoje dane
            </PrimaryButton>
            <p className={styles.message_caption}>
              Dane, które dodasz do profilu, będą widoczne dla innych
              użytkowników
            </p>
          </div>
        )}

        <div className={styles.user_profile}>
          <GeneralInfo
            name={user.userName}
            role={user.role}
            imgURL={user.imgURL}
            opinions={user.opinions}
            description={user.description}
            hourlyRate={user.hourlyRate}
            joiningDate={user.joiningDate}
            userId={user.Id}
          ></GeneralInfo>

          {user.skills?.length !== 0 && <Skills skills={user.skills}></Skills>}

          <Opinions
            className={styles.opinions}
            currentUserData={user}
            setUser={setUser}
          />

          {user.experience?.length !== 0 && (
            <ProfileList
              className={styles.experience}
              listData={user.experience}
              header="Doświadczenie"
            />
          )}

          {user.education?.length !== 0 && (
            <ProfileList
              className={styles.education}
              listData={user.education}
              header="Edukacja / Kwalifikacje"
            />
          )}
          <ContactUser />
        </div>
      </>
    );
  }
};

export default UserProfile;
