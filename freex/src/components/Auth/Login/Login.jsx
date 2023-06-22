import { Link, Navigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import useAuth from "../../Context/AuthContext";
import { toast } from "react-hot-toast";
import { firebaseErrors } from "../../../utils/firebaseErrors";

const Login = () => {
  const { login, currentUser } = useAuth();

  const location = useLocation();

  const handleSubmit = async (formEvent) => {
    formEvent.preventDefault();

    const email = formEvent.target?.email.value;
    const password = formEvent.target?.password.value;

    try {
      await login(email, password);
      toast.success("Logowanie zakończone sukcesem");
    } catch (error) {
      {
        firebaseErrors[error.code]
          ? toast.error(firebaseErrors[error.code])
          : toast.error("Wystąpił błąd. Spróbuj później");
      }
    }
  };

  return (
    <>
      {!currentUser ? (
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Hasło</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Zaloguj się</button>
            <p>
              Nie masz jeszcze konta?
              <Link to="/register">Zarejestruj się</Link>
            </p>
          </form>
        </div>
      ) : location.state ? (
        <Navigate to={location.state.from.pathname} />
      ) : (
        <Navigate to="/userID/panelglowny" />
      )}
    </>
  );
};

export default Login;
