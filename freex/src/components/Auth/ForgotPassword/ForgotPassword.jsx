import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../../config/firebase";
import { Form } from "../../Form/Form";
import { firebaseErrors } from "../../../utils/firebaseErrors";
import styles from "../ForgotPassword/ForgotPassword.module.css";

export const ForgotPassword = () => {
  const handlePasswordReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, e.target.email.value).catch((e) => {
      console.log(e.code);
      alert(firebaseErrors[e.code]);
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
