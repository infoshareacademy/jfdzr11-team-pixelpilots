import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div>
        <NavLink to="/">Panel główny</NavLink>
        <NavLink to="/students">Moje oferty</NavLink>
        <NavLink to="/grades">Dodaj ofertę</NavLink>
        <NavLink to="/grades">Znajdź freeleancera</NavLink>
        <NavLink to="/notes">Moje zlecenia</NavLink>
        <NavLink to="/notes">Znajdź zlecenie</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
