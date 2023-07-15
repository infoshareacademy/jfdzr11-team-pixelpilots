import ChosenSkills from '../Skills/ChosenSkills';
import styles from './Summary.module.css';

const Summary = ({ title, skills, payment, paymentMethod, description }) => {
  return (
    <div className={styles.summary_wrapper}>
      <div className={styles.top_summary}>
        <h2 className={styles.title}>{title}</h2>
        <ChosenSkills
          chosenSkills={skills}
          skillClassName={styles.summary_skill}
          skillsClassName={styles.summary_skills}
        />
        <div>{payment}</div>
      </div>
      <textarea
        placeholder="Opis projektu"
        className={styles.description_summary}
        name="description_summary"
        value={description}
      ></textarea>
      <p className={styles.summary_data}>
        Preferowana forma płatności:{' '}
        <span className={styles.payment_method}>{paymentMethod}</span>
      </p>
    </div>
  );
};
export default Summary;
