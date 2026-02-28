import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Home.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail/PostDetail";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading, error } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (normalizedQuery) {
      navigate(`/search?q=${normalizedQuery}`);
    }
  };

  return (
    <div className={styles.home}>
      <h2>Veja os posts mais recentes</h2>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(event) => setQuery(event.target.value)}
          className={styles.search}
          value={query}
        />
        <button className={styles.btn}>
          <i className="bi bi-search"></i>
          <span>Pesquisar</span>
        </button>
      </form>
      <div className={styles.post_list}>
        {loading && <LoadingScreen label="Buscando posts..." compact />}
        {error && <p className="error">{error}</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {!loading && posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts.</p>
            <Link to="/posts/create" className="btn">
              <i className="bi bi-plus-circle"></i>
              <span>Criar primeiro post</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
