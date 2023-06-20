import styles from "./Navbar.module.css";
import NavbarLink from "../UI/NavbarLink/NavbarLink";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
        <NavbarLink linkURL="/">Home</NavbarLink>
        <NavbarLink linkURL="/:userId">Panel główny</NavbarLink>
        <NavbarLink linkURL="/mojeoferty">Moje oferty</NavbarLink>
        <NavbarLink linkURL="/dodajoferte">Dodaj ofertę</NavbarLink>
        <NavbarLink linkURL="/mojezlecenia">Moje zlecenia</NavbarLink>
        <NavbarLink linkURL="/znajdzzlecenie">Znajdź zlecenie</NavbarLink>
      </div>
    </div>
  );
};

export default Navbar;
