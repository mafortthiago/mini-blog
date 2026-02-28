import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Sobre o projeto</p>
        <h2>
          Um espaço simples para publicar ideias, histórias e referências.
        </h2>
        <p className={styles.lead}>
          O Mini Blog foi construído para praticar React e Firebase com uma
          estrutura direta: autenticação, criação de posts, edição e busca por
          tags em uma interface leve.
        </p>
        <div className={styles.actions}>
          <Link to="/posts/create" className="btn">
            <i className="bi bi-plus-square"></i>
            <span>Criar post</span>
          </Link>
          <Link to="/" className={styles.secondaryLink}>
            <i className="bi bi-journal-text"></i>
            <span>Ver posts</span>
          </Link>
        </div>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <i className={`bi bi-bullseye ${styles.cardIcon}`}></i>
          <h3>Foco</h3>
          <p>
            O objetivo do projeto é manter o fluxo principal enxuto: entrar,
            escrever, editar e encontrar conteúdo sem excesso de camadas.
          </p>
        </article>

        <article className={styles.card}>
          <i className={`bi bi-stack ${styles.cardIcon}`}></i>
          <h3>Tecnologias</h3>
          <p>
            React organiza a interface, React Router controla a navegação e o
            Firebase atende autenticação e persistência dos posts.
          </p>
        </article>

        <article className={styles.card}>
          <i className={`bi bi-diagram-3 ${styles.cardIcon}`}></i>
          <h3>Estrutura</h3>
          <p>
            O código foi separado em páginas, componentes e hooks para deixar a
            manutenção mais previsível e facilitar evoluções futuras.
          </p>
        </article>
      </div>
    </section>
  );
};

export default About;
