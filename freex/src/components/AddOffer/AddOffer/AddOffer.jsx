import PremiumOption from '../PremiumOption/PremiumOption';
import Data from '../PremiumOption/PremiumOptionData.json';
import Summary from '../Summary/Summary';
import styles from './AddOffer.module.css';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../../config/firebase';
import useAuth from '../../Context/AuthContext';
import { ref, uploadBytesResumable } from 'firebase/storage';
import Skills from '../Skills/Skills';
import { useState } from 'react';
import skillsData from '../Skills/skills.json';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import CharacterCounter from '../CharacterCounter/CharacterCounter';

const AddOffer = () => {
  const { currentUser } = useAuth();

  const [skills, setSkills] = useState(skillsData);
  const [chosenSkills, setChosenSkills] = useState([]);
  const [titleLength, setTitleLength] = useState('0');
  const [descriptionLength, setDescriptionLength] = useState('0');

  const offersCollectionRef = collection(db, 'offers');

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = e.target.add_file.files[0];
    const storageRef = ref(storage, `files/${file?.name}`);

    const offerData = {
      userId: currentUser.uid,
      title: e.target.title.value,
      description: e.target.description.value,
      skills: chosenSkills,
      payment_method: e.target.payment_method.value,
      hourly_rate: `${e.target.hourly_rate?.value} zł/godz.`,
      milestone_rate: `${e.target.milestone_rate?.value} zł/kamień milowy`,
      total_payment: `${e.target.total_payment?.value} zł`,
      premium_plan: {
        highlight: e.target.highlight.checked,
        analysis: e.target.analysis.checked,
        support: e.target.support.checked,
        contracts: e.target.highlight.checked,
      },
    };

    if (file) uploadBytesResumable(storageRef, file);

    addDoc(offersCollectionRef, offerData);
  };

  const handleChange = (e, setLength) => {
    const length = e.target.value.length;
    setLength(length);
  };

  return (
    <div className={styles.add_offer_wrapper}>
      <form
        onSubmit={handleSubmit}
        className={styles.add_offer_form}
        id="add_offer"
      >
        <h2 className={styles.title}>Wpisz tytuł projektu</h2>
        <input
          onChange={(e) => handleChange(e, setTitleLength)}
          placeholder="Wpisz tytuł który będzie najlepiej odzwierciedlał Twój projekt"
          className={styles.project_title}
          name="title"
          type="text"
        />
        <CharacterCounter length={titleLength} />
        <h2 className={styles.title}>Opisz swój projekt</h2>
        <textarea
          onChange={(e) => handleChange(e, setDescriptionLength)}
          className={styles.description}
          placeholder="Opisz swój projekt tutaj"
          name="description"
          id="description"
        ></textarea>
        <CharacterCounter length={descriptionLength} />

        <div>
          <label className={styles.add_file} htmlFor="add_file">
            Upload file
          </label>
          <input
            className={styles.add_file_input}
            id="add_file"
            name="add_file"
            type="file"
          />
        </div>
        <h2 className={styles.title}>Jakie umiejętności są potrzebne?</h2>

        <Skills
          chosenSkills={chosenSkills}
          setChosenSkills={setChosenSkills}
          skills={skills}
          setSkills={setSkills}
        />
        <PaymentMethod />
        <div className={styles.premium_plan_section}>
          {Data.map((option, idx) => (
            <PremiumOption
              key={idx}
              plan_name={option.plan_name}
              plan_title={option.plan_title}
              plan_description={option.plan_description}
              img={option.img}
            />
          ))}
        </div>
        <h2 className={styles.title}>Podsumowanie</h2>
        <Summary />
        <div className={styles.submit_section}>
          <h2 className={styles.total}>Łącznie: 160 PLN</h2>
          <button className={styles.submit_button} type="submit">
            Opublikuj
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOffer;
