import { NavLink } from "react-router-dom";
import styles from "./NavbarLink.module.css";
import PropTypes from "prop-types";

const NavbarLink = ({ linkURL, children }) => {
  return (
    <NavLink
      className={styles.navlink}
      style={({ isActive }) => ({
        textShadow: isActive && "0 0 0.6px rgb(55, 63, 73)",
      })}
      to={linkURL}
    >
      {children}
    </NavLink>
  );
};

NavbarLink.propTypes = {
  children: PropTypes.any,
  linkURL: PropTypes.string,
};

export default NavbarLink;
