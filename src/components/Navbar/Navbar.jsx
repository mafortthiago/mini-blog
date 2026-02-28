import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logOut } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((currentState) => !currentState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to={"/"} onClick={closeMenu}>
        <h1 className={styles.title}>
          Mini <span className={styles.blog}>blog</span>
        </h1>
      </NavLink>
      <div
        className={isOpen ? styles.menuAberto : styles.menuFechado}
        onClick={toggleMenu}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
          }
        }}
      >
        <div className={styles.btn_menu}></div>
      </div>
      <ul className={isOpen ? styles.ulLinks : styles.nav}>
        <li className={styles.navLink}>
          <NavLink to={"/"} className={styles.link} onClick={closeMenu}>
            <i className="bi bi-house-door"></i>
            <span>Home</span>
          </NavLink>
        </li>
        <li className={styles.navLink}>
          <NavLink to={"/about"} className={styles.link} onClick={closeMenu}>
            <i className="bi bi-info-circle"></i>
            <span>Sobre</span>
          </NavLink>
        </li>
        {!user && (
          <>
            <li className={styles.navLink}>
              <NavLink
                to={"/login"}
                className={styles.link}
                onClick={closeMenu}
              >
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Entrar</span>
              </NavLink>
            </li>
            <li className={styles.navLink}>
              <NavLink
                to={"/register"}
                className={styles.link}
                onClick={closeMenu}
              >
                <i className="bi bi-person-plus"></i>
                <span>Registrar</span>
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li className={styles.navLink}>
              <NavLink
                to={"/dashboard"}
                className={styles.link}
                onClick={closeMenu}
              >
                <i className="bi bi-grid-1x2"></i>
                <span>Painel</span>
              </NavLink>
            </li>
            <li className={styles.navLink}>
              <NavLink
                to={"/posts/create"}
                className={styles.link}
                onClick={closeMenu}
              >
                <i className="bi bi-plus-square"></i>
                <span>Postar</span>
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <li className={styles.navLink}>
            <button
              onClick={() => {
                closeMenu();
                logOut();
              }}
              className={styles.btn_logout}
              aria-label="Sair da conta"
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
