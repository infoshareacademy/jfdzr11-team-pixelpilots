import { useState } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import useAuth from "../../Context/AuthContext";
import { toast } from "react-hot-toast";
import { firebaseErrors } from "../../../utils/firebaseErrors";
import { PrimaryButton } from "../../index";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, currentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {!currentUser ? (
        <div className={styles.container}>
          <div className={styles.left}>
            <img
              className={styles.box}
              src="./Login/login_photo.png"
              alt="Login"
            />
          </div>
          <div className={styles.right}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.forminnerdiv}>
                <h2>Witaj ponownie!</h2>
                <label htmlFor="email">Adres e-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Wpisz adres e-mail..."
                />
                <label htmlFor="password">Hasło</label>
                <div className={styles.passwordField}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Wpisz hasło..."
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <p className={styles.forgotpass}>
                  <a href="/forgotpassword">Zapomniałeś hasła?</a>
                </p>
                <PrimaryButton type="submit">Zaloguj się</PrimaryButton>
                <div className={styles.separator}>
                  <div className={styles.line}></div>
                  <p>Nie masz konta?</p>
                  <div className={styles.line}></div>
                </div>
                <button
                  className={styles.loginbutton}
                  onClick={() => {
                    navigate("/register");
                  }}>
                  Zarejestruj się
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : location.state ? (
        <Navigate to={location.state.from.pathname} />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Login;
