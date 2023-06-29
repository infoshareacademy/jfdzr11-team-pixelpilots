import skillsData from "../../AddOffer/Skills/skills.json";
import { useNavigate } from "react-router-dom";
import styles from "./EditUserProfile.module.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import Skills from "../../AddOffer/Skills/Skills";
import { v4 as uuid } from "uuid";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import { user } from "../mockUser";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import useAuth from "../../Context/AuthContext";
import { db, storage } from "../../../config/firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const EditUserProfile = () => {
  const { currentUser } = useAuth();
  const currentUserID = currentUser.uid;

  const navigate = useNavigate();

  const [skills, setSkills] = useState(skillsData);
  const [chosenSkills, setChosenSkills] = useState([]);
  const [experienceInputFields, setExperienceInputFields] = useState([]);
  const [educationInputFields, setEducationInputFields] = useState([]);
  const [profileImgUrl, setProfileImgUrl] = useState("");

  const uploadFile = (e) => {
    const file = e.target.profileImg.files[0];

    if (file) {
      const fileRef = ref(storage, `profileimgs/${currentUserID}`);
      uploadBytesResumable(fileRef, file)
        .then(() => getDownloadURL(fileRef))
        .then((imageURL) => setProfileImgUrl(imageURL));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    uploadFile(e);

    const updatedUser = {
      userName: e.target.userName.value,
      email: e.target.email.value,
      role: e.target.role.value,
      imgURL: profileImgUrl,
      rating: 0,
      opinionsNumber: 0,
      hourlyRate: e.target.hourlyRate.value,
      joiningDate: "not ready yet",
      description: e.target.description.value,
      skills: chosenSkills,
      experience: experienceInputFields,
      education: educationInputFields,
    };

    const docRef = doc(db, "users", currentUserID);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        updateDoc(docRef, updatedUser);
      } else {
        console.log("No such document!");
        setDoc(docRef, { email: currentUser.email });
      }
    });
  };

  const handleExperienceInputBlur = (e, id) => {
    let data = [...experienceInputFields];
    const itemIndex = data.findIndex((item) => item.id === id);
    data[itemIndex][e.target.name] = e.target.value;
    setExperienceInputFields(data);
  };

  const handleEducationInputBlur = (e, id) => {
    let data = [...educationInputFields];
    const itemIndex = data.findIndex((item) => item.id === id);
    data[itemIndex][e.target.name] = e.target.value;
    setEducationInputFields(data);
  };

  const addExperienceFields = (e) => {
    e.preventDefault();
    const newElementId = uuid();
    let newfield = {
      id: newElementId,
      role: "",
      companyName: "",
      start: "",
      end: "",
    };
    setExperienceInputFields([...experienceInputFields, newfield]);
  };

  const removeExperienceItem = (e, itemId) => {
    e.preventDefault();
    const updatedItems = experienceInputFields.filter(
      (item) => item.id !== itemId
    );
    setExperienceInputFields(updatedItems);
  };

  const addEducationFields = (e) => {
    e.preventDefault();
    const newElementId = uuid();
    let newfield = {
      id: newElementId,
      institution: "",
      title: "",
      start: "",
      end: "",
    };

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
            defaultValue={user.userName}
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
            defaultValue={user.role}
          />
          <label className={styles.input_label} htmlFor="houtlyRate">
            Stawka godzinowa
          </label>
          <input
            placeholder="Podaj swoją stawkę godzinową"
            className={styles.input}
            type="text"
            id="hourlyRate"
            name="hourlyRate"
            defaultValue={user.hourlyRate}
          />

          <div className={styles.custom_file_input}>
            <input
              type="file"
              id="profileImg"
              name="profileImg"
              // className={styles.hidden_input}
            />
            {/* <label htmlFor="profileImg" className={styles.custom_button}>
              Dodaj zdjęcie profilowe
            </label> */}
          </div>

          <legend className={styles.input_label}>Opis</legend>
          <textarea
            placeholder="Napisz coś o sobie. Możesz opisać lata doświadczenia, branżę lub umiejętności. Inni użytkownicy opisują też ich osiągnięcia lub doświadczenie z poprzednich miejsc pracy."
            className={styles.textarea}
            id="description"
            name="description"
            defaultValue={user.description}
          />
        </fieldset>

        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Dane kontaktowe</legend>
          <label className={styles.input_label} htmlFor="email">
            Adres email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Np. jan_kowalski@gmail.com"
            defaultValue={currentUser.email}
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
                    onBlur={(e) => handleExperienceInputBlur(e, item.id)}
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
                    onBlur={(e) => handleExperienceInputBlur(e, item.id)}
                  />
                  <label className={styles.input_label} htmlFor="start">
                    Data rozpoczęcia
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="start"
                    name="start"
                    onBlur={(e) => handleExperienceInputBlur(e, item.id)}
                  />
                  <label className={styles.input_label} htmlFor="end">
                    Data zakończenia
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="end"
                    name="end"
                    onBlur={(e) => handleExperienceInputBlur(e, item.id)}
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
                    onBlur={(e) => handleEducationInputBlur(e, item.id)}
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
                    onBlur={(e) => handleEducationInputBlur(e, item.id)}
                  />
                  <label className={styles.input_label} htmlFor="start">
                    Data rozpoczęcia
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="start"
                    name="start"
                    onBlur={(e) => handleEducationInputBlur(e, item.id)}
                  />
                  <label className={styles.input_label} htmlFor="end">
                    Data zakończenia
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="end"
                    name="end"
                    onBlur={(e) => handleEducationInputBlur(e, item.id)}
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
