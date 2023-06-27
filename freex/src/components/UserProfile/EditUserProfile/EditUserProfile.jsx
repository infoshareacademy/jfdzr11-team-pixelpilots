import { skillBase } from "../../../utils/skillBase";
import { useNavigate } from "react-router-dom";
import styles from "./EditUserProfile.module.css";
import { v4 as uuid } from "uuid";
import ProfileCard from "../ProfileCard/ProfileCard";

const updateHandler = () => {};

const EditUserProfile = () => {
  const navigate = useNavigate();
  return (
    <ProfileCard className={styles.wrapper}>
      <h4>Edytuj profil użytkownika</h4>
      <form className={styles.form} onSubmit={updateHandler}>
        <fieldset className={styles.form_fieldset}>
          <legend>Personal data</legend>
          <label htmlFor="firstName">Imię</label>
          <input type="text" id="firstName" name="firstName" />
          <label htmlFor="lastName">Nazwisko</label>
          <input type="text" id="lastName" name="lastName" />
          {/* input do imienia */}
          <label htmlFor="role">Zawód</label>
          <input type="text" id="role" name="role" />
          <label htmlFor="class">Stawka godzinowa</label>
          <input type="text" id="class" name="class" />
          <legend>Opis</legend>
          <textarea id="notes" name="notes" />
        </fieldset>
        <fieldset className={styles.form_fieldset}>
          <legend>Skills:</legend>
          <ul>
            {skillBase.map((item) => {
              return (
                <li key={uuid()}>
                  <input type="checkbox" id={item} name={item} />
                  <label htmlFor={item}>{item}</label>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <fieldset className={styles.form_fieldset}>
          <legend>Experience</legend>
          <label htmlFor="role">Twoje stanowsiko</label>
          <input type="text" id="role" name="role" />
          <label htmlFor="companyName">Nazwa firmy</label>
          <input type="text" id="companyName" name="companyName" />
          <label htmlFor="startingTime">Data rozpoczęcia</label>
          <input type="date" id="startingTime" name="startingTime" />
          <label htmlFor="endingTime">Data zakończenia</label>
          <input type="date" id="endingTime" name="endingTime" />
        </fieldset>
        <fieldset className={styles.form_fieldset}>
          <legend>Experience</legend>
        </fieldset>
        <button className={styles.button}>Zapisz zmiany</button>
        <button
          className={styles.button}
          type="button"
          onClick={() => navigate("/profil")}
        >
          Cofnij
        </button>
      </form>
    </ProfileCard>
  );
};

export default EditUserProfile;
