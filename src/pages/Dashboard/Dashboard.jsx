import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument, response } = useDeleteDocument("posts");

  const totalReactions =
    posts?.reduce((accumulator, post) => {
      const reactions = post.reactions || {};
      return (
        accumulator +
        (reactions.love || 0) +
        (reactions.fire || 0) +
        (reactions.wow || 0)
      );
    }, 0) || 0;

  if (loading) {
    return <LoadingScreen label="Carregando painel..." compact />;
  }

  return (
    <section className={styles.dashboard}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Painel</p>
          <h2>Gerencie seus posts</h2>
          <p className={styles.description}>
            Acompanhe suas publicações, edite o conteúdo e remova o que não faz
            mais sentido manter no ar.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <i className={`bi bi-journal-richtext ${styles.statIcon}`}></i>
            <strong>{posts?.length || 0}</strong>
            <span>Posts publicados</span>
          </div>
          <div className={styles.statCard}>
            <i className={`bi bi-emoji-heart-eyes ${styles.statIcon}`}></i>
            <strong>{totalReactions}</strong>
            <span>Reações recebidas</span>
          </div>
        </div>
      </div>

      {posts && posts.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>Você ainda não publicou nada.</h3>
          <p>Comece com um post curto e ajuste depois no seu ritmo.</p>
          <Link to="/posts/create" className={styles.primaryAction}>
            <i className="bi bi-plus-circle"></i>
            <span>Criar primeiro post</span>
          </Link>
        </div>
      ) : (
        <div className={styles.postGrid}>
          {posts &&
            posts.map((post) => {
              const preview = post.summary || post.body?.slice(0, 140) || "";
              const reactions = post.reactions || {};
              const reactionCount =
                (reactions.love || 0) +
                (reactions.fire || 0) +
                (reactions.wow || 0);

              return (
                <article key={post.id} className={styles.postCard}>
                  <div className={styles.cardTop}>
                    <p className={styles.cardLabel}>Post</p>
                    <h3>{post.title}</h3>
                    {preview && <p className={styles.cardSummary}>{preview}</p>}
                  </div>

                  <div className={styles.metaRow}>
                    <span>
                      <i className="bi bi-tags"></i>
                      {post.tag?.length || 0} tags
                    </span>
                    <span>
                      <i className="bi bi-hearts"></i>
                      {reactionCount} reações
                    </span>
                  </div>

                  <div className={styles.tagList}>
                    {post.tag?.slice(0, 4).map((tag) => (
                      <span key={tag} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    <Link
                      to={`/posts/${post.id}`}
                      className={styles.secondaryAction}
                    >
                      <i className="bi bi-eye"></i>
                      <span>Ver</span>
                    </Link>
                    <Link
                      to={`/posts/edit/${post.id}`}
                      className={styles.secondaryAction}
                    >
                      <i className="bi bi-pencil-square"></i>
                      <span>Editar</span>
                    </Link>
                    <button
                      type="button"
                      className={styles.deleteAction}
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Tem certeza que deseja excluir o post?",
                          )
                        ) {
                          await deleteDocument(post.id);
                        }
                      }}
                    >
                      <i className="bi bi-trash3"></i>
                      <span>Excluir</span>
                    </button>
                  </div>
                </article>
              );
            })}
        </div>
      )}

      {response.error && <p className="error">{response.error}</p>}
    </section>
  );
};

export default Dashboard;
