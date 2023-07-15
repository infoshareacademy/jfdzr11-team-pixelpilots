import styles from "./DeleteAccountConfirm.module.css";
import Modal from "../../UI/Modal/Modal";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../UI/SecondaryButton/SecondaryButton";

const DeleteAccountConfirm = ({ isVisible, setIsVisible, deleteAccount }) => {
  return (
    <Modal visible={isVisible} setVisible={() => setIsVisible(false)}>
      <div className={styles.wrapper}>
        <h4 className={styles.modal_subheading}>
          Czy na pewno chcesz usunąć swoje konto?
        </h4>
        <div className={styles.button_container}>
          <PrimaryButton
            onClick={() => setIsVisible(false)}
            className={styles.button}
          >
            Cofnij
          </PrimaryButton>
          <SecondaryButton
            onClick={() => {
              deleteAccount();
              setIsVisible(false);
            }}
            className={styles.button}
          >
            Usuń
          </SecondaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountConfirm;
