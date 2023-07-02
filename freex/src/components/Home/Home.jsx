import styles from "../Home/Home.module.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className={styles.container}>
      {currentUser ? (
        <>{/* <h1>Witaj ponownie!</h1> */}</>
      ) : (
        //powrót do strony głównej//
        <>
          <div className={styles.left}>
            <h1>Załóż konto już dziś</h1>
            <h1>i dołącz do społeczności</h1>
            <h1>profesjonalistów</h1>
            <p className={styles.text}>
              Nieważne, czy jesteś doświadczonym freelancerem, który szuka
              nowych możliwości i projektów, czy przedsiębiorcą dążącym do
              rozwoju swojej firmy - tutaj znajdziesz wsparcie, inspirację i
              narzędzia, które pomogą Ci osiągnąć Twoje cele!
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.relative}>
              <button
                className={`${styles.homebtn} ${styles.absolute}`}
                onClick={() => navigate("/login")}>
                Zaloguj się
              </button>
              <img className={styles.box} src="../Home/register_find.png"></img>
            </div>
            <div className={styles.relative}>
              <button
                className={`${styles.homebtn} ${styles.absolute}`}
                onClick={() => navigate("/register")}>
                Zarejestruj się
              </button>
              <img className={styles.box} src="../Home/register_in.png"></img>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
