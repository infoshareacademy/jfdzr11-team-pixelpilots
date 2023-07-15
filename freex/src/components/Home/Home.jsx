import styles from "../Home/Home.module.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/AuthContext";
import MainPanel from "../MainPanel/MainPanel";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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
                <PrimaryButton
                  type="submit"
                  onClick={() => {
                    navigate("/login");
                  }}>
                  Zaloguj się
                </PrimaryButton>

                <img
                  className={styles.box}
                  src="../Home/register_find.png"></img>
              </div>
              <div className={styles.relative}>
                <PrimaryButton
                  type="submit"
                  onClick={() => {
                    navigate("/register");
                  }}>
                  Zarejestruj się
                </PrimaryButton>

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
