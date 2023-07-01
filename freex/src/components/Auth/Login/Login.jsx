import { useNavigate, Navigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import useAuth from "../../Context/AuthContext";
import { toast } from "react-hot-toast";
import { firebaseErrors } from "../../../utils/firebaseErrors";

const Login = () => {
  const { login, currentUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

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
          <div className={styles.left}>
            <img src="./Login/welcomeback.png"></img>
          </div>
          <div className={styles.right}>
            <h1>Witaj ponownie!</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="email">Adres e-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Wpisz adres email..."
              />
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Wpisz hasło..."
              />
              <button type="submit">Zaloguj się</button>
            </form>
            <p>
              Nie masz konta?
              <button
                className={styles.loginbutton}
                onClick={() => {
                  navigate("/register");
                }}>
                Zarejestruj się
              </button>
            </p>
          </div>
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
