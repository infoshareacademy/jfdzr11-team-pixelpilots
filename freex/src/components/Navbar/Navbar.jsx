import styles from "./Navbar.module.css";
import NavbarLink from "../UI/NavbarLink/NavbarLink";
import useAuth from "../Context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
        <NavbarLink linkURL="/">Home</NavbarLink>
        <NavbarLink linkURL="/:userId">Panel główny</NavbarLink>
        <NavbarLink linkURL="/mojeoferty">Moje oferty</NavbarLink>
        <NavbarLink linkURL="/dodajoferte">Dodaj ofertę</NavbarLink>
        <NavbarLink linkURL="/mojezlecenia">Moje zlecenia</NavbarLink>
        <NavbarLink linkURL="/znajdzzlecenie">Znajdź zlecenie</NavbarLink>
        {currentUser ? <span>Zalogowoany</span> : null}
        <button
          onClick={() => {
            logout();
            console.log("logout");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
