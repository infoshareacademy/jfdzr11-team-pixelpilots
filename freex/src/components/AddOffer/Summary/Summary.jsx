import styles from './Summary.module.css';

const Summary = ({ title, skills, payment, paymentMethod, description }) => {
  return (
    <div className={styles.summary_wrapper}>
      <div className={styles.top_summary}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.skills}>
          {skills.map((skill, idx) => (
            <div className={styles.summary_skill} key={idx}>
              {skill}
            </div>
          ))}
        </div>
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
      <p className={styles.summary_data}>Załączniki: </p>
    </div>
  );
};
export default Summary;
