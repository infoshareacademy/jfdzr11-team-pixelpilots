import styles from "./Navbar.module.css";
import NavbarLink from "../UI/NavbarLink/NavbarLink";
import useAuth from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        {!currentUser ? (
          <NavbarLink linkURL="/">Home</NavbarLink>
        ) : (
          <>
            <NavbarLink linkURL="/userID/panelglowny">Panel główny</NavbarLink>
            <NavbarLink linkURL="/userID/mojeoferty">Moje oferty</NavbarLink>
            <NavbarLink linkURL="/userID/dodajoferte">Dodaj ofertę</NavbarLink>
            <NavbarLink linkURL="/userID/mojezlecenia">
              Moje zlecenia
            </NavbarLink>
            <NavbarLink linkURL="/userID/znajdzzlecenie">
              Znajdź zlecenie
            </NavbarLink>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
