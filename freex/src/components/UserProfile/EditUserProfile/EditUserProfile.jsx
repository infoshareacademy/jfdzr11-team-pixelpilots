import skillsData from "../../AddOffer/Skills/skills.json";
import { useNavigate } from "react-router-dom";
import styles from "./EditUserProfile.module.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import Skills from "../../AddOffer/Skills/Skills";
import { v4 as uuid } from "uuid";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import useAuth from "../../Context/AuthContext";
import { db, storage } from "../../../config/firebase";
import { useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getUserCreationDate } from "./getUserCreationDate";

const EditUserProfile = () => {
  const { currentUser } = useAuth();
  const currentUserID = currentUser.uid;
  const userCreationDate = getUserCreationDate(currentUser);

  const navigate = useNavigate();

  const [skills, setSkills] = useState(skillsData);
  const [chosenSkills, setChosenSkills] = useState([]);
  const [experienceInputFields, setExperienceInputFields] = useState([]);
  const [educationInputFields, setEducationInputFields] = useState([]);
  const [experienceLogosToBeDeleted, setExperienceLogosTobeDeleted] = useState(
    []
  );
  const [educationLogosToBeDeleted, setEducationLogosTobeDeleted] = useState(
    []
  );
  const [user, setUser] = useState(null);

  const docRef = doc(db, "users", currentUserID);
  useEffect(() => {
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser(userData);
        setChosenSkills(userData.skills);
        setExperienceInputFields(userData.experience);
        setEducationInputFields(userData.education);
      } else {
        setUser(null);
      }
    });
  }, []);

  const uploadFile = async (e) => {
    const file = e.target.profileImg.files[0];
    if (file) {
      const fileRef = ref(storage, `users/${currentUserID}/profileImg`);
      await uploadBytesResumable(fileRef, file);
      const imageURL = await getDownloadURL(fileRef);
      return imageURL;
    } else {
      return null;
    }
  };

  const uploadLogos = async (inputs, category, setFunction) => {
    let data = [...inputs];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const file = item.logo;
      if (file && file instanceof File) {
        const fileRef = ref(
          storage,
          `users/${currentUserID}/${category}/${item.id}`
        );
        await uploadBytesResumable(fileRef, file);
        const imageURL = await getDownloadURL(fileRef);
        data[i].logo = imageURL;
      }
    }
    setFunction(data);
  };

  const removeRedundantLogos = async (itemIDs) => {
    itemIDs.forEach((item) => {
      const fileRef = ref(storage, `users/${currentUserID}/experience/${item}`);
      deleteObject(fileRef)
        .then(() => {
          console.log("File deleted successfully.");
        })
        .catch((error) => {
          console.log("Error deleting file:", error);
        });
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const profileImgUrl = await uploadFile(e);

    await removeRedundantLogos(experienceLogosToBeDeleted);
    await removeRedundantLogos(educationLogosToBeDeleted);

    await uploadLogos(
      experienceInputFields,
      "experience",
      setExperienceInputFields
    );

    await uploadLogos(
      educationInputFields,
      "education",
      setEducationInputFields
    );

    const updatedUser = {
      id: currentUserID,
      userName: e.target.userName.value,
      email: e.target.email.value,
      role: e.target.role.value,
      imgURL: profileImgUrl ? profileImgUrl : user.imgURL,
      hourlyRate: e.target.hourlyRate.value,
      joiningDate: userCreationDate,
      description: e.target.description.value,
      skills: chosenSkills,
      experience: experienceInputFields,
      education: educationInputFields,
    };

    const docRef = doc(db, "users", currentUserID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      if (docData !== updatedUser) {
        await updateDoc(docRef, updatedUser);
      }
    } else {
      await setDoc(docRef, updatedUser);
    }
    navigate("/profil");
  };

  const handleExperienceInputBlur = (e, id) => {
    let data = [...experienceInputFields];
    const itemIndex = data.findIndex((item) => item.id === id);
    if (e.target.name == "logo") {
      data[itemIndex][e.target.name] = e.target.files[0];
    } else {
      data[itemIndex][e.target.name] = e.target.value;
    }
    setExperienceInputFields(data);
  };

  const handleEducationInputBlur = (e, id) => {
    let data = [...educationInputFields];
    const itemIndex = data.findIndex((item) => item.id === id);
    if (e.target.name == "logo") {
      data[itemIndex][e.target.name] = e.target.files[0];
    } else {
      data[itemIndex][e.target.name] = e.target.value;
    }
    setEducationInputFields(data);
  };

  const addExperienceFields = (e) => {
    e.preventDefault();
    const newElementId = uuid();
    let newfield = {
      id: newElementId,
      title: "",
      subtitle: "",
      start: "",
      end: "",
      logo: "",
    };
    setExperienceInputFields((previousExperienceInputFields) => [
      ...previousExperienceInputFields,
      newfield,
    ]);
  };

  const removeExperienceItem = (e, itemId) => {
    e.preventDefault();
    const updatedItems = experienceInputFields.filter(
      (item) => item.id !== itemId
    );
    setExperienceInputFields(updatedItems);
    setExperienceLogosTobeDeleted((previousLogosToBeDeleted) => [
      ...previousLogosToBeDeleted,
      itemId,
    ]);
  };

  const addEducationFields = (e) => {
    e.preventDefault();
    const newElementId = uuid();
    let newfield = {
      id: newElementId,
      title: "",
      subtitle: "",
      start: "",
      end: "",
      logo: "",
    };

    setEducationInputFields((previousEducationInputFields) => [
      ...previousEducationInputFields,
      newfield,
    ]);
  };

  const removeEducationItem = (e, itemId) => {
    e.preventDefault();
    const updatedItems = educationInputFields.filter(
      (item) => item.id !== itemId
    );
    setEducationInputFields(updatedItems);
    setEducationLogosTobeDeleted((previousLogosToBeDeleted) => [
      ...previousLogosToBeDeleted,
      itemId,
    ]);
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
            defaultValue={user ? user.userName : ""}
            required
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
            defaultValue={user ? user.role : ""}
            required
          />
          <label className={styles.input_label} htmlFor="hourlyRate">
            Stawka godzinowa (PLN/h)
          </label>
          <input
            placeholder="Np. 150"
            className={styles.input}
            type="number"
            id="hourlyRate"
            name="hourlyRate"
            defaultValue={user ? user.hourlyRate : ""}
            required
          />

          <div className={styles.custom_file_input}>
            <input type="file" id="profileImg" name="profileImg" />
          </div>

          <legend className={styles.input_label}>Opis</legend>
          <textarea
            placeholder="Napisz coś o sobie. Możesz opisać lata doświadczenia, branżę lub umiejętności. Inni użytkownicy opisują też ich osiągnięcia lub doświadczenie z poprzednich miejsc pracy."
            className={styles.textarea}
            id="description"
            name="description"
            defaultValue={user ? user.description : ""}
            required
            minLength={100}
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
            defaultValue={user ? user.email : currentUser.email}
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

          <ul className={styles.list}>
            {experienceInputFields.map((item) => {
              return (
                <li key={item.id} className={styles.listItem}>
                  <label className={styles.input_label} htmlFor="title">
                    Twoje stanowisko
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Np. Senior UI Designer"
                    onBlur={(e) => handleExperienceInputBlur(e, item.id)}
                    defaultValue={item.title ? item.title : ""}
                  />
                  <label className={styles.input_label} htmlFor="subtitle">
                    Nazwa firmy
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    placeholder="Np. Freex Sp. z o. o."
                    onBlur={(e) => handleExperienceInputBlur(e, item.id)}
                    defaultValue={item.subtitle ? item.subtitle : ""}
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
                    defaultValue={item.start ? item.start : ""}
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
                    defaultValue={item.end ? item.end : ""}
                  />
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    onBlur={(e) => handleExperienceInputBlur(e, item.id)}
                  />
                  <PrimaryButton
                    className={styles.button}
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

          <ul className={styles.list}>
            {educationInputFields.map((item) => {
              return (
                <li key={item.id} className={styles.listItem}>
                  <label className={styles.input_label} htmlFor="title">
                    Uczelnia
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Np. Politechnika Gdańska"
                    onBlur={(e) => handleEducationInputBlur(e, item.id)}
                    defaultValue={item.title ? item.title : ""}
                  />
                  <label className={styles.input_label} htmlFor="subtitle">
                    Tytuł
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    placeholder="Np. licencjat"
                    onBlur={(e) => handleEducationInputBlur(e, item.id)}
                    defaultValue={item.subtitle ? item.subtitle : ""}
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
                    defaultValue={item.start ? item.start : ""}
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
                    defaultValue={item.end ? item.end : ""}
                  />
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    onBlur={(e) => handleEducationInputBlur(e, item.id)}
                  />
                  <PrimaryButton
                    className={styles.button}
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
