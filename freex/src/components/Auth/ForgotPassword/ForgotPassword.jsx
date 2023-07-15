import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../../config/firebase";
import { firebaseErrors } from "../../../utils/firebaseErrors";
import styles from "../ForgotPassword/ForgotPassword.module.css";
import { PrimaryButton } from "../../index";
import { toast } from "react-hot-toast";

const Form = ({ submitText, onSubmit }) => (
  <div className={styles.container}>
    <div className={styles.left}>
      <img className={styles.box} src="./Login/login_photo.png"></img>
    </div>
    <div className={styles.right}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.forminnerdiv}>
          <h2>Wpisz adres do przypomnienia hasła</h2>
          <label htmlFor="email">Adres e-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Wpisz adres e-mail..."
          />
          <PrimaryButton>{submitText}</PrimaryButton>
        </div>
      </form>
    </div>
  </div>
);

export const ForgotPassword = () => {
  const handlePasswordReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, e.target.email.value).catch((error) => {
      console.log(error.code);
      toast.error(firebaseErrors[error.code]);
    });
  };

  return (
    <Form
      submitText="Wyślij przypomnienie na e-mail"
      onSubmit={handlePasswordReset}
      isPasswordHidden
    />
  );
};
