import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';
import styles from './MyOfferActions.module.css';

const MyOfferActions = () => {
  return (
    <div>
      <PrimaryButton className={styles.button}>Edytuj</PrimaryButton>
      <PrimaryButton className={styles.button}>
        Podgląd na stronie głównej
      </PrimaryButton>
      <PrimaryButton className={styles.button}>Usuń</PrimaryButton>
    </div>
  );
};
export default MyOfferActions;
