import styles from "../Home/Home.module.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/AuthContext";
import MainPanel from "../MainPanel/MainPanel";
import Loader from "../UI/Loader/Loader";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, isAuth } = useAuth();

  if (isAuth === null) {
    return <Loader isLoading={isAuth} />;
  }
  return (
    <>
      {currentUser ? (
        <MainPanel />
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.left}>
              <h2>
                Załóż konto już dziś
                <br />
                i dołącz do społeczności
                <br />
                profesjonalistów
              </h2>
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
                  onClick={() => navigate("/login")}
                >
                  Zaloguj się
                </button>
                <img
                  className={styles.box}
                  src="../Home/register_find.png"
                ></img>
              </div>
              <div className={styles.relative}>
                <button
                  className={`${styles.homebtn} ${styles.absolute}`}
                  onClick={() => navigate("/register")}
                >
                  Zarejestruj się
                </button>
                <img className={styles.box} src="../Home/register_in.png"></img>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
