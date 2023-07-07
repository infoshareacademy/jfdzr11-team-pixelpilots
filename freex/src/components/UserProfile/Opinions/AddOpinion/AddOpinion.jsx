import PrimaryButton from "../../../UI/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../UI/SecondaryButton/SecondaryButton";
import styles from "./AddOpinion.module.css";
import Skills from "../../../AddOffer/Skills/Skills";
import { useState } from "react";
import skillsData from "../../../AddOffer/Skills/skills.json";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useAuth from "../../../Context/AuthContext";
import { db } from "../../../../config/firebase";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddOpinion = ({ setVisibility }) => {
  const [skills, setSkills] = useState(skillsData);
  const [chosenSkills, setChosenSkills] = useState([]);
  const { currentUser } = useAuth();
  const { userId } = useParams();
  const userProfileDocRef = doc(db, "users", userId);

  const currentUserID = currentUser.uid;
  const docRef = doc(db, "users", currentUserID);

  const getUserData = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData;
    } else {
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = await getUserData();

    const currentDate = new Date();

    const formattedDate = currentDate
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");

    const newOpinion = await {
      title: e.target.title.value,
      rating: e.target.rating.value,
      description: e.target.description.value,
      skills: chosenSkills,
      author: userData.userName,
      dateAdded: formattedDate,
      imgUrl: userData.imgURL,
      id: uuid(),
      authorId: userData.id,
    };

    try {
      const docSnap = await getDoc(userProfileDocRef);
      const docData = docSnap.data();

      const updatedOpinions = docData.opinions
        ? [...docData.opinions, newOpinion]
        : [newOpinion];

      await updateDoc(userProfileDocRef, { opinions: updatedOpinions });
      setVisibility(false);
      toast.success("Dodano opinie o użytkowniku");
    } catch (error) {
      toast.error("Pojawił się błąd:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>Dodaj opinię</h4>
      <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
        <input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          step="1"
          className={styles.input}
          placeholder="Twoja ocena"
          required
        />
        <input
          id="title"
          name="title"
          className={styles.input}
          maxLength={100}
          placeholder="Nazwa zadania, które oceniasz. Np. Audyt UX i projekt strony"
          required
        />
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          placeholder="Twoja opinia"
        ></textarea>
        <p className={styles.legend}>
          Wybierz umiejętności wykorzystane podczas realizacji zadania
        </p>
        <Skills
          chosenSkills={chosenSkills}
          setChosenSkills={setChosenSkills}
          skills={skills}
          setSkills={setSkills}
        />
        <div className={styles.buttons_container}>
          <PrimaryButton type="submit" className={styles.button}>
            Dodaj opinię
          </PrimaryButton>
          <SecondaryButton
            type="button"
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              setVisibility(false);
            }}
          >
            Anuluj
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
};

export default AddOpinion;
