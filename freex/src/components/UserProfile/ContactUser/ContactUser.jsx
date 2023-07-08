import { useState } from "react";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import Modal from "../../UI/Modal/Modal";
import styles from "./ContactUser.module.css";

const ContactUser = ({ email, userName }) => {
  const [isContactInfoVisible, setIsContactInfoVisible] = useState(false);

  return (
    <div className={styles.contact}>
      <h5 className={styles.contact_header}>
        Skontaktuj się z freelancerem w sprawie swojego projektu
      </h5>
      <PrimaryButton
        onClick={() => {
          console.log("bum");
          setIsContactInfoVisible(true);
        }}
      >
        Informacje kontaktowe
      </PrimaryButton>
      <Modal
        visible={isContactInfoVisible}
        setVisible={() => setIsContactInfoVisible(false)}
      >
        <div className={styles.modal_wrapper}>
          <h5 className={styles.modal_header}>{userName}</h5>
          <h4 className={styles.modal_subheading}>Informacje kontaktowe </h4>

          <div className={styles.email_wrapper}>
            <h4 className={styles.subheading}>Email: </h4>
            <span>{email}</span>
          </div>
          <PrimaryButton
            onClick={() => setIsContactInfoVisible(false)}
            className={styles.close_button}
          >
            Zamknij
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
};

export default ContactUser;
