import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
const Dashboard = () => {
  const user = useAuthValue();
  const uid = user.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const deleteDocument = (id) => {};
  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className={styles.dashboard}>
      <h2>Dashborad</h2>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noPost}>
          <p>Não foram encontrados posts</p>
          <Link to={"/posts/create"} className={styles.btn}>
            Criar primeiro post!
          </Link>
        </div>
      ) : (
        <div>
          {posts &&
            posts.map((post) => (
              <>
                <h3 className={styles.titleButtons}>
                  Título do post: {post.title}
                </h3>
                <div key={post.id} className={styles.buttons}>
                  <Link
                    to={`/posts/${post.id}`}
                    className={styles.btnDashboard}
                  >
                    Ver o post
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className={styles.btnDashboard}
                  >
                    Editar
                  </Link>
                  <Link
                    onClick={() => deleteDocument(post.id)}
                    className={styles.btnDashboard}
                  >
                    Excluir
                  </Link>
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
