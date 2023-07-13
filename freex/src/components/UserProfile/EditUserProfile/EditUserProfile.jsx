import skillsData from "../../AddOffer/Skills/skills.json";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../../config/firebase";
import { useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getUserCreationDate } from "./getUserCreationDate";
import styles from "./EditUserProfile.module.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import Skills from "../../AddOffer/Skills/Skills";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import useAuth from "../../Context/AuthContext";
import SecondaryButton from "../../UI/SecondaryButton/SecondaryButton";
import Loader from "../../UI/Loader/Loader";
import { toast } from "react-hot-toast";

const EditUserProfile = () => {
  const { currentUser } = useAuth();
  const currentUserID = currentUser.uid;
  const userCreationDate = getUserCreationDate(currentUser);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const MAX_FILE_SIZE = 1048576;

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  };

  const maxDate = getCurrentDate();

  const docRef = doc(db, "users", currentUserID);

  useEffect(() => {
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser(userData);
        setChosenSkills(userData.skills);
        if (userData.experience) {
          setExperienceInputFields(userData.experience);
        }
        if (userData.education) {
          setEducationInputFields(userData.education);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
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

  const removeRedundantLogos = async (itemIDs, category) => {
    itemIDs.forEach((item) => {
      const fileRef = ref(
        storage,
        `users/${currentUserID}/${category}/${item}`
      );
      deleteObject(fileRef);
    });
  };

  const isFileTooBig = (file) => {
    if (file instanceof File && file.size > MAX_FILE_SIZE) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isFileTooBig(e.target.profileImg.files[0])) {
        toast.error(
          "Rozmiar dodanego zdjęcia profilowego jest za duży. Największy akceptowany rozmiar pliku to 1MB. Zmień plik przed zapisaniem zmian."
        );
        return;
      }

      if (
        experienceInputFields.some((item) => isFileTooBig(item.logo)) ||
        educationInputFields.some((item) => isFileTooBig(item.logo))
      ) {
        toast.error(
          "Rozmiar dodanego logo jest za duży. Największy akceptowany rozmiar pliku to 1MB. Zmień plik przed zapisaniem zmian."
        );
        return;
      }

      const profileImgUrl = await uploadFile(e);

      await removeRedundantLogos(experienceLogosToBeDeleted, "experience");
      await removeRedundantLogos(educationLogosToBeDeleted, "education");

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
          toast.success("Wprowadzono zmiany w profilu użytkownika");
        } else {
          toast("Profil użytkownika pozostal bez zmian");
        }
      } else {
        await setDoc(docRef, updatedUser);
        toast.success("Wprowadzono zmiany w profilu użytkownika");
      }
      navigate(`/profil/${currentUserID}`);
    } catch (e) {
      toast.error("Wystąpił błąd. Error " + e);
    }
  };

  const handleBlur = (e, id, inputsValues, setInputsValues) => {
    let data = [...inputsValues];
    const itemIndex = data.findIndex((item) => item.id === id);
    if (e.target.name == "logo") {
      const file = e.target.files[0];
      data[itemIndex][e.target.name] = file;
    } else {
      data[itemIndex][e.target.name] = e.target.value;
    }
    setInputsValues(data);
  };

  const addField = (e, setState) => {
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
    setState((previousState) => [...previousState, newfield]);
  };

  const removeItem = (
    e,
    itemId,
    inputsValues,
    setInputsValues,
    setLogosToBeDeleted
  ) => {
    e.preventDefault();
    const updatedItems = inputsValues.filter((item) => item.id !== itemId);
    setInputsValues(updatedItems);
    setLogosToBeDeleted((previousLogosToBeDeleted) => [
      ...previousLogosToBeDeleted,
      itemId,
    ]);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
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
          <label className={styles.input_label} htmlFor="logo">
            Dodaj zdjęcie profilowe
          </label>
          <input
            className={styles.file_input}
            type="file"
            id="profileImg"
            name="profileImg"
          />

          <legend className={styles.description_label}>Opis</legend>
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
            onClick={(e) => addField(e, setExperienceInputFields)}
          >
            Dodaj kolejną pozycję
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
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        experienceInputFields,
                        setExperienceInputFields
                      )
                    }
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
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        experienceInputFields,
                        setExperienceInputFields
                      )
                    }
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
                    min="1950-01-01"
                    max={maxDate}
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        experienceInputFields,
                        setExperienceInputFields
                      )
                    }
                    defaultValue={item.start ? item.start : ""}
                  />
                  <label className={styles.input_label} htmlFor="end">
                    Data zakończenia
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    min="1950-01-01"
                    max={maxDate}
                    id="end"
                    name="end"
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        experienceInputFields,
                        setExperienceInputFields
                      )
                    }
                    defaultValue={item.end ? item.end : ""}
                  />
                  <label className={styles.input_label} htmlFor="logo">
                    Dodaj logo
                  </label>
                  <input
                    className={styles.file_input}
                    type="file"
                    id="logo"
                    name="logo"
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        experienceInputFields,
                        setExperienceInputFields
                      )
                    }
                  />
                  <SecondaryButton
                    className={styles.remove_button}
                    onClick={(event) =>
                      removeItem(
                        event,
                        item.id,
                        experienceInputFields,
                        setExperienceInputFields,
                        setExperienceLogosTobeDeleted
                      )
                    }
                  >
                    Usuń
                  </SecondaryButton>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset className={styles.form_fieldset}>
          <legend className={styles.legend}>Edukacja / Kwalifikacje</legend>
          <PrimaryButton
            className={styles.button}
            onClick={(e) => addField(e, setEducationInputFields)}
          >
            Dodaj kolejną pozycję
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
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        educationInputFields,
                        setEducationInputFields
                      )
                    }
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
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        educationInputFields,
                        setEducationInputFields
                      )
                    }
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
                    min="1950-01-01"
                    max={maxDate}
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        educationInputFields,
                        setEducationInputFields
                      )
                    }
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
                    min="1950-01-01"
                    max={maxDate}
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        educationInputFields,
                        setEducationInputFields
                      )
                    }
                    defaultValue={item.end ? item.end : ""}
                  />
                  <label className={styles.input_label} htmlFor="logo">
                    Dodaj logo
                  </label>
                  <input
                    className={styles.file_input}
                    type="file"
                    id="logo"
                    name="logo"
                    onBlur={(e) =>
                      handleBlur(
                        e,
                        item.id,
                        educationInputFields,
                        setEducationInputFields
                      )
                    }
                  />
                  <SecondaryButton
                    className={styles.remove_button}
                    onClick={(event) =>
                      removeItem(
                        event,
                        item.id,
                        educationInputFields,
                        setEducationInputFields,
                        setEducationLogosTobeDeleted
                      )
                    }
                  >
                    Usuń
                  </SecondaryButton>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <div className={styles.button_wrapper}>
          <PrimaryButton className={styles.button}>Zapisz zmiany</PrimaryButton>
          <SecondaryButton
            className={styles.button}
            type="button"
            onClick={() => navigate(`/profil/${currentUserID}`)}
          >
            Cofnij
          </SecondaryButton>
        </div>
      </form>
    </ProfileCard>
  );
};

export default EditUserProfile;
