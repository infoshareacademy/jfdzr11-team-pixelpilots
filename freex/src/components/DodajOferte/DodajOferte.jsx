import OpcjaPremium from './OpcjaPremium';
import Data from './OpcjaPremiumDane.json';
import Podsumowanie from './Podsumowanie';
import styles from './DodajOferte.module.css';
const DodajOferte = () => {
  return (
    <div className={styles.add_offer_wrapper}>
      <form className={styles.add_offer_form}>
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
          <input name="payment_method" id="hourly_rate" type="radio" />
          <label htmlFor="hourly_rate">Płatność za godziny</label>
        </div>
        <div className={styles.radio}>
          <input name="payment_method" id="milestones" type="radio" />
          <label htmlFor="milestones">Płatność za kamienie milowe</label>
        </div>
        <div className={styles.radio}>
          <input name="payment_method" id="one_time_payment" type="radio" />
          <label htmlFor="one_time_payment">Jednorazowa płatność</label>
        </div>
        <p>Stawka godzinowa</p>
        <select name="stawka" id="stawka">
          <option value="">Regularna (55-90zł/h)</option>
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
      </form>
    </div>
  );
};

export default DodajOferte;
