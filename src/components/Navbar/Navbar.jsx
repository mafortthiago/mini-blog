import React, { useEffect, useState, useRef } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

import { NavLink } from "react-router-dom";
import imgLogOut from "../../assets/img/logOut.png";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const { user } = useAuthValue();
  const { logOut } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar} onClick={() => handleMenuClick()}>
      <NavLink to={"/"}>
        <h1 className={styles.title}>
          Mini <span className={styles.blog}>blog</span>
        </h1>
      </NavLink>
      <div
        className={isOpen ? styles.menuAberto : styles.menuFechado}
        onClick={() => handleMenuClick()}
      >
        <div className={styles.btn_menu}></div>
      </div>
      <ul className={isOpen ? styles.ulLinks : styles.nav}>
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
        {user && (
          <li className={styles.navLink}>
            <button onClick={logOut} className={styles.btn_logout}>
              <img
                src={imgLogOut}
                alt="botão de logOut"
                className={styles.logout_img}
              />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
