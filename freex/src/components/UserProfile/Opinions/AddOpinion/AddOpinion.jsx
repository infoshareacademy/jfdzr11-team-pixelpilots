import PrimaryButton from "../../../UI/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../UI/SecondaryButton/SecondaryButton";
import styles from "./AddOpinion.module.css";
import Skills from "../../../AddOffer/Skills/Skills";
import { useState } from "react";
import skillsData from "../../../AddOffer/Skills/skills.json";

const AddOpinion = ({ setVisibility }) => {
  const [skills, setSkills] = useState(skillsData);
  const [chosenSkills, setChosenSkills] = useState([]);

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>Dodaj opinię</h4>
      <form className={styles.form}>
        <input className={styles.input} placeholder="Twoja ocena" />
        <input
          className={styles.input}
          placeholder="Nazwa zadania, które oceniasz. Np. Audyt UX i projekt strony"
        />
        <textarea
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
          <PrimaryButton className={styles.button}>Dodaj opinię</PrimaryButton>
          <SecondaryButton
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