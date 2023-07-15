import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../../config/firebase";
import { firebaseErrors } from "../../../utils/firebaseErrors";
import styles from "../ForgotPassword/ForgotPassword.module.css";
import { PrimaryButton } from "../../index";
import { toast } from "react-hot-toast";

const Form = ({ submitText, isPasswordHidden = false, onSubmit }) => (
  <form className={styles.form} onSubmit={onSubmit}>
    <div>
      <label htmlFor="email">
        Podaj swój adres e-mail do przypomnienia hasła
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Wpisz adres e-mail..."
      />
    </div>
    {!isPasswordHidden && (
      <div>
        <label htmlFor="password">Podaj hasło</label>
        <input type="password" name="password" id="password" />
      </div>
    )}
    <PrimaryButton>{submitText}</PrimaryButton>
  </form>
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
