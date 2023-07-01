import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import styles from "./ContactUser.module.css";

const ContactUser = () => {
  return (
    <div className={styles.contact}>
      <h5 className={styles.contact_header}>
        Skontaktuj się z freelancerem w sprawie swojego projektu
      </h5>
      <PrimaryButton>Informacje kontaktowe</PrimaryButton>
    </div>
  );
};

export default ContactUser;
