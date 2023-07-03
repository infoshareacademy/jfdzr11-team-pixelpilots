import PrimaryButton from "../../../UI/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../UI/SecondaryButton/SecondaryButton";
import styles from "./NewOpinion.module.css";

const NewOpinion = ({ setVisibility }) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>Dodaj opinię</h4>
      <form className={styles.form}>
        <input className={styles.input} placeholder="Twoja ocena" />
        <input
          className={styles.input}
          placeholder="Nazwa zadania, które oceniasz. Np. Audyt UX i projekt strony"
        />
        <textarea
          className={styles.textarea}
          placeholder="Twoja opinia"
        ></textarea>
        <input
          className={styles.input}
          placeholder="Umiejętności wykorzystane przy zrealizowaniu zadania"
        />
        <div className={styles.buttons_container}>
          <PrimaryButton className={styles.button}>Dodaj opinię</PrimaryButton>
          <SecondaryButton
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              setVisibility(false);
            }}
          >
            Anuluj
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
};

export default NewOpinion;
