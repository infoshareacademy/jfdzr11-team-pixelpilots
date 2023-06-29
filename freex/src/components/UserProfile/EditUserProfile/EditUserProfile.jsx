import skillsData from "../../AddOffer/Skills/skills.json";
import { useNavigate } from "react-router-dom";
import styles from "./EditUserProfile.module.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import Skills from "../../AddOffer/Skills/Skills";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";

const submitHandler = (e) => {
  e.preventDefault();
  // const updatedUser = {};
  const formData = new FormData(e.target);
  const formDataObject = Object.fromEntries(formData.entries());
  console.log(formDataObject);
};

const EditUserProfile = () => {
  const navigate = useNavigate();

  const [skills, setSkills] = useState(skillsData);
  const [chosenSkills, setChosenSkills] = useState([]);
  const [experienceInputFields, setExperienceInputFields] = useState([]);
  const [educationInputFields, setEducationInputFields] = useState([]);

  const addExperienceFields = (e) => {
    e.preventDefault();
    const newElementId = uuid();
    console.log(newElementId);
    let newfield = {
      id: newElementId,
      role: "",
      companyName: "",
      start: "",
      end: "",
    };
    console.log(newfield);

    setExperienceInputFields([...experienceInputFields, newfield]);
  };

  const removeExperienceItem = (e, itemId) => {
    e.preventDefault();
    console.log(itemId);
    const updatedItems = experienceInputFields.filter(
      (item) => item.id !== itemId
    );
    setExperienceInputFields(updatedItems);
  };

  const addEducationFields = (e) => {
    e.preventDefault();
    const newElementId = uuid();
    console.log(newElementId);
    let newfield = {
      id: newElementId,
      institution: "",
      title: "",
      start: "",
      end: "",
    };
    console.log(newfield);

    setEducationInputFields([...educationInputFields, newfield]);
  };

  const removeEducationItem = (e, itemId) => {
    e.preventDefault();
    console.log(itemId);
    const updatedItems = educationInputFields.filter(
      (item) => item.id !== itemId
    );
    setEducationInputFields(updatedItems);
  };

  return (
    <ProfileCard className={styles.wrapper}>
      <h4 className={styles.heading}>Edytuj profil użytkownika</h4>
      <form className={styles.form} onSubmit={submitHandler}>
        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Dane użytkownika</legend>
          <label className={styles.input_label} htmlFor="userName">
            Nazwa użytkownika
          </label>
          <input
            className={styles.input}
            type="text"
            id="userName"
            name="userName"
            placeholder="Wpisz swoją nazwę użytkownika"
          />
          <label className={styles.input_label} htmlFor="role">
            Stanowisko
          </label>
          <input
            placeholder="Np. UX designer"
            className={styles.input}
            type="text"
            id="role"
            name="role"
          />
          <label className={styles.input_label} htmlFor="class">
            Stawka godzinowa
          </label>
          <input
            placeholder="Podaj swoją stawkę godzinową"
            className={styles.input}
            type="text"
            id="class"
            name="class"
          />

          <div className={styles.custom_file_input}>
            <input
              type="file"
              id="file-input"
              className={styles.hidden_input}
            />
            <label htmlFor="file_input" className={styles.custom_button}>
              Dodaj zdjęcie profilowe
            </label>
          </div>

          <legend className={styles.input_label}>Opis</legend>
          <textarea
            placeholder="Napisz coś o sobie. Możesz opisać lata doświadczenia, branżę lub umiejętności. Inni użytkownicy opisują też ich osiągnięcia lub doświadczenie z poprzednich miejsc pracy."
            className={styles.textarea}
            id="description"
            name="description"
          />
        </fieldset>

        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Umiejętności</legend>
          <Skills
            chosenSkills={chosenSkills}
            setChosenSkills={setChosenSkills}
            skills={skills}
            setSkills={setSkills}
          />
        </fieldset>

        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Doświadczenie</legend>
          <PrimaryButton
            className={styles.button}
            onClick={addExperienceFields}
          >
            Add More..
          </PrimaryButton>

          <ul>
            {experienceInputFields.map((item) => {
              return (
                <li key={item.id} className={styles.listItem}>
                  <label className={styles.input_label} htmlFor="role">
                    Twoje stanowisko
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="role"
                    name="role"
                    placeholder="Np. Senior UI Designer"
                  />
                  <label className={styles.input_label} htmlFor="companyName">
                    Nazwa firmy
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Np. Freex Sp. z o. o."
                  />
                  <label className={styles.input_label} htmlFor="start">
                    Data rozpoczęcia
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="start"
                    name="start"
                  />
                  <label className={styles.input_label} htmlFor="end">
                    Data zakończenia
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="end"
                    name="end"
                  />
                  <PrimaryButton
                    onClick={(event) => removeExperienceItem(event, item.id)}
                  >
                    Usuń
                  </PrimaryButton>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Edukacja / Kwalifikacje</legend>
          <PrimaryButton className={styles.button} onClick={addEducationFields}>
            Add More..
          </PrimaryButton>

          <ul>
            {educationInputFields.map((item) => {
              return (
                <li key={item.id} className={styles.listItem}>
                  <label className={styles.input_label} htmlFor="institution">
                    Uczelnia
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="institution"
                    name="institution"
                    placeholder="Np. Politechnika Gdańska"
                  />
                  <label className={styles.input_label} htmlFor="title">
                    Tytuł
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Np. licencjat"
                  />
                  <label className={styles.input_label} htmlFor="start">
                    Data rozpoczęcia
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="start"
                    name="start"
                  />
                  <label className={styles.input_label} htmlFor="end">
                    Data zakończenia
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="end"
                    name="end"
                  />
                  <PrimaryButton
                    onClick={(event) => removeEducationItem(event, item.id)}
                  >
                    Usuń
                  </PrimaryButton>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <PrimaryButton className={styles.button}>Zapisz zmiany</PrimaryButton>
        <PrimaryButton
          className={styles.button}
          type="button"
          onClick={() => navigate("/profil")}
        >
          Cofnij
        </PrimaryButton>
      </form>
    </ProfileCard>
  );
};

export default EditUserProfile;
