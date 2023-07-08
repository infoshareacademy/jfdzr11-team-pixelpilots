import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
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
import SecondaryButton from "../UI/SecondaryButton/SecondaryButton";
import { deleteObject, ref } from "firebase/storage";

const UserProfile = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const currentUserID = currentUser.uid;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const docRef = doc(db, "users", userId);
    try {
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser(userData);
        } else if (currentUserID === userId) {
          setUser(null);
        } else {
          navigate("*");
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

  const removeLogos = async (itemArray, category) => {
    if (itemArray && itemArray !== []) {
      itemArray.forEach((item) => {
        if (item.logo) {
          const fileRef = ref(
            storage,
            `users/${currentUserID}/${category}/${item.id}`
          );
          deleteObject(fileRef);
        }
      });
    }
  };

  const removeProfilePicture = async () => {
    const fileRef = ref(storage, `users/${currentUserID}/profileImg`);
    deleteObject(fileRef);
  };

  const deleteAccountHandler = async () => {
    try {
      if (user?.experience?.[0]) {
        await removeLogos(user.experience, "experience");
      }
    } catch (error) {
      console.log("Problems deleting user files" + error);
    }
    try {
      if (user?.education?.[0]) {
        await removeLogos(user.education, "education");
      }
    } catch (error) {
      console.log("Problems deleting user files" + error);
    }
    try {
      if (user?.imgURL) {
        await removeProfilePicture();
      }
    } catch (error) {
      console.log("Problems deleting user files" + error);
    }

    try {
      const docRef = doc(db, "users", currentUserID);
      await deleteDoc(docRef);
    } catch (error) {
      console.log("Problems deleting user data" + error);
    }
    try {
      await currentUser.delete();
      toast.success("Usunięto użytkownika");
      navigate("/register");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        toast.error(
          "Przed usunięciem konta musisz się wylogować i ponownie zalogować"
        );
      } else {
        toast.error("Nie udało sie usunąc użytkownika. Spróbuj później");
      }
    }
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
        <SecondaryButton
          className={styles.message_button}
          type="button"
          onClick={() => deleteAccountHandler()}
        >
          Usuń swoje konto
        </SecondaryButton>
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
            <SecondaryButton
              className={styles.message_button}
              type="button"
              onClick={() => deleteAccountHandler()}
            >
              Usuń swoje konto
            </SecondaryButton>
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
