import OpcjaPremium from './OpcjaPremium';
import Data from './OpcjaPremiumDane.json';
import Podsumowanie from './Podsumowanie';
import styles from './DodajOferte.module.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const DodajOferte = () => {
  const offersDocRef = collection(db, 'offers');

  const handleSubmit = (e) => {
    e.preventDefault();

    const offerData = {
      title: e.target.title.value,
      description: e.target.description.value,
      skills: [...e.target.skills.value.split(',')],
      hourly_rate: e.target.rate.value,
      payment_method: e.target.payment_method.value,
      premium_plan: {
        highlight: e.target.highlight.checked,
        analysis: e.target.analysis.checked,
        support: e.target.support.checked,
        contracts: e.target.highlight.checked,
      },
    };

    addDoc(offersDocRef, offerData);
  };

  return (
    <div className={styles.add_offer_wrapper}>
      <form onSubmit={handleSubmit} className={styles.add_offer_form}>
        <h2>Wpisz tytuł projektu</h2>
        <input className={styles.project_title} name="title" type="text" />
        <div className={styles.character_counter}>
          <p>Helper text</p>
          <p>0/100</p>
        </div>
        <h2>Opisz swój projekt</h2>
        <textarea name="description" id="description"></textarea>
        <div className={styles.character_counter}>
          <p>Helper text</p>
          <p>0/100</p>
        </div>
        <button>Załącz plik</button>
        <h2>Jakie umiejętności są potrzebne?</h2>
        <textarea name="skills" id="skills"></textarea>
        <h2>Jak chcesz zapłacić?</h2>
        <div className={styles.radio}>
          <input
            value="Płatność za godziny"
            name="payment_method"
            id="hourly_rate"
            type="radio"
          />
          <label htmlFor="hourly_rate">Płatność za godziny</label>
        </div>
        <div className={styles.radio}>
          <input
            value="Płatność za kamienie milowe"
            name="payment_method"
            id="milestones"
            type="radio"
          />
          <label htmlFor="milestones">Płatność za kamienie milowe</label>
        </div>
        <div className={styles.radio}>
          <input
            value="Jednorazowa płatność"
            name="payment_method"
            id="one_time_payment"
            type="radio"
          />
          <label htmlFor="one_time_payment">Jednorazowa płatność</label>
        </div>
        <p>Stawka godzinowa</p>
        <select name="rate" id="rate">
          <option value="'Regularna (55-90zł/h)">Regularna (55-90zł/h)</option>
        </select>
        <div>
          {Data.map((option, idx) => (
            <OpcjaPremium
              key={idx}
              plan_name={option.plan_name}
              plan_title={option.plan_title}
              plan_description={option.plan_description}
              img={option.img}
            />
          ))}
        </div>
        <Podsumowanie />
        <button type="submit">Opublikuj</button>
      </form>
    </div>
  );
};

export default DodajOferte;
