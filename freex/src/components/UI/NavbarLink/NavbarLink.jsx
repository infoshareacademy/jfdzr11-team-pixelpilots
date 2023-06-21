import { NavLink } from "react-router-dom";
import styles from "./NavbarLink.module.css";
import PropTypes from "prop-types";

const NavbarLink = ({ linkURL, children }) => {
  return (
    <NavLink
      className={styles.navlink}
      style={({ isActive }) => ({
        fontWeight: isActive && "700",
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
