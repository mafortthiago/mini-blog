import styles from "./About.module.css";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o mini blog</h2>
      <p>
        Este projeto foi feito com react no front end, e firebase no back-end.
      </p>
      <Link to={"/posts/create"} className="btn">
        Postar
      </Link>
    </div>
  );
};

export default About;
