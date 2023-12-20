import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to={"/"}>
        <h1 className={styles.title}>
          Mini <span className={styles.blog}>blog</span>
        </h1>
      </NavLink>
      <ul className={styles.ulLinks}>
        <li className={styles.navLink}>
          <NavLink to={"/"} className={styles.link}>
            Home
          </NavLink>
        </li>
        <li className={styles.navLink}>
          <NavLink to={"/about"} className={styles.link}>
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
