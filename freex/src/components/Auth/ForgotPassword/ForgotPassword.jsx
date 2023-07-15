import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../../config/firebase";
import { firebaseErrors } from "../../../utils/firebaseErrors";
import styles from "../ForgotPassword/ForgotPassword.module.css";
import { PrimaryButton } from "../../index";

const Form = ({ submitText, isPasswordHidden = false, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="email">Podaj email</label>
      <input type="email" name="email" id="email" />
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
      alert(firebaseErrors[error.code]);
    });
  };

  return (
    <Form
      submitText="Poproś o przypomnienie hasła"
      onSubmit={handlePasswordReset}
      isPasswordHidden
    />
  );
};
