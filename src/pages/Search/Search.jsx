import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail/PostDetail";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const Search = () => {
  const query = useQuery();
  const search = query.get("q")?.trim() || "";
  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h2>Resultados encontrados para: {search || "busca vazia"}</h2>
      <div>
        {loading && <LoadingScreen label="Procurando resultados..." compact />}
        {error && <p className="error">{error}</p>}
        {!loading && posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <br />
          </>
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
