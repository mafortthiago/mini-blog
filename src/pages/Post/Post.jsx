import { useFetchDocument } from "../../hooks/useFetchDocument";
import styles from "./Post.module.css";
import { Link, useParams } from "react-router-dom";
const Post = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  return (
    <>
      <div className={styles.post}>
        {post && (
          <>
            <div className={styles.image}>
              <img src={post.image} alt={post.title} />
            </div>
            <div className={styles.content}>
              <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>

              <div className={styles.tags}>
                <h4>Assuntos nesse post:</h4>
                {post.tag.map((tag) => (
                  <p key={tag}>#{tag}</p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Link className={styles.btn} to={"/"}>
        Home
      </Link>
    </>
  );
};

export default Post;
