import React from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const { user } = useAuthValue();

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
        {!user && (
          <>
            <li className={styles.navLink}>
              <NavLink to={"/login"} className={styles.link}>
                Entrar
              </NavLink>
            </li>
            <li className={styles.navLink}>
              <NavLink to={"/register"} className={styles.link}>
                Registrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li className={styles.navLink}>
              <NavLink to={"/dashboard"} className={styles.link}>
                Painel
              </NavLink>
            </li>
            <li className={styles.navLink}>
              <NavLink to={"/posts/create"} className={styles.link}>
                Postar
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
