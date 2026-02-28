import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <p className={styles.eyebrow}>Mini blog</p>
          <h3>Transforme seus pensamentos em postagens.</h3>
          <p className={styles.description}>
            Um espaço leve para publicar ideias, organizar referências e manter
            textos sempre por perto.
          </p>
        </div>

        <div className={styles.metaBlock}>
          <span className={styles.badge}>
            <i className="bi bi-stars"></i>
            React + Firebase
          </span>
          <div className={styles.socialLinks}>
            <a
              href="https://github.com/mafortthiago"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <i className="bi bi-github"></i>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.thiagomafort.com.br/"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="Portfólio"
            >
              <i className="bi bi-globe2"></i>
              <span>Portfólio</span>
            </a>
          </div>
          <p>Mini blog © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
