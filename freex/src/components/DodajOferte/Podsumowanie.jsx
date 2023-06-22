import styles from './Podsumowanie.module.css';

const Podsumowanie = () => {
  return (
    <div className={styles.summary_wrapper}>
      <div className={styles.top_summary}>
        <h2 className={styles.title}>Title</h2>
        <p>Skills</p>
        <p>xxx PLN</p>
      </div>
      <textarea
        placeholder="Opis projektu"
        className={styles.description_summary}
        name="description_summary"
      ></textarea>
      <p className={styles.summary_data}>Preferowana forma płatności:</p>
      <p className={styles.summary_data}>Załączniki:</p>
    </div>
  );
};
export default Podsumowanie;
