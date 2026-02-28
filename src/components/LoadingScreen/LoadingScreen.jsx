import styles from "./LoadingScreen.module.css";

const LoadingScreen = ({ label = "Carregando...", compact = false }) => {
  return (
    <div className={compact ? styles.compact : styles.fullscreen}>
      <div className={styles.loaderCard}>
        <div className={styles.orbit}>
          <span className={styles.ring}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>Mini blog</p>
          <p className={styles.label}>{label}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
