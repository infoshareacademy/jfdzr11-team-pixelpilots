import styles from "./Navbar.module.css";
import NavbarLink from "../UI/NavbarLink/NavbarLink";
import useAuth from "../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const currentUserId = currentUser?.uid;

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.navbar_left}>
          <NavLink className={styles.logo_link} to="/">
            <img className={styles.logo} src="../../../Navbar/freex_logo.png" />
          </NavLink>
          {!currentUser ? null : (
            <>
              <NavbarLink linkURL="/mojeoferty">Moje oferty</NavbarLink>
              <NavbarLink linkURL="/dodajoferte">Dodaj ofertę</NavbarLink>
              <NavbarLink linkURL="/freelancerzy">
                Znajdź freelancera
              </NavbarLink>
              <NavbarLink linkURL="/zlecenia">Znajdź zlecenie</NavbarLink>
            </>
          )}
        </div>
        <div className={styles.navbar_right}>
          {currentUser ? (
            <>
              <button
                className={styles.button_logout}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Wyloguj się
              </button>
              <button
                className={styles.button_icon}
                onClick={() => {
                  navigate("/ulubione");
                }}
              >
                <img
                  className={styles.icon}
                  src="../../../Navbar/icon_ulubione.png"
                />
              </button>
              <button
                className={styles.button_icon}
                onClick={() => {
                  navigate(`/profil/${currentUserId}`);
                }}
              >
                <img
                  className={styles.icon}
                  src="../../../Navbar/icon_profil.png"
                />
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.button_logout}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Zaloguj się
              </button>
              <button
                className={styles.button_logout}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Zarejestruj się
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.underline}></div>
    </nav>
  );
};

export default Navbar;
