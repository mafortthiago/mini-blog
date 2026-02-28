import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail/PostDetail";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const Search = () => {
  const query = useQuery();
  const search = query.get("q")?.trim().toLowerCase() || "";
  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Busca</p>
        <h2>Resultados para: {search || "busca vazia"}</h2>
      </div>

      <div className={styles.results}>
        {loading && <LoadingScreen label="Procurando resultados..." compact />}
        {error && <p className="error">{error}</p>}
        {!loading && posts && posts.length === 0 && (
          <div className={styles.emptyState}>
            <i className={`bi bi-search-heart ${styles.emptyIcon}`}></i>
            <h3>Nenhum post encontrado</h3>
            <p>
              Tente buscar por outra tag ou use palavras mais curtas para
              encontrar conteúdos relacionados.
            </p>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>

      <Link to="/" className={styles.btn}>
        <i className="bi bi-arrow-left"></i>
        <span>Voltar</span>
      </Link>
    </div>
  );
};

export default Search;
