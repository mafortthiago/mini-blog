import { Link } from "react-router-dom";
import styles from "./PostDetail.module.css";

const PostDetail = ({ post }) => {
  const previewText = post.summary || post.body?.slice(0, 120);

  return (
    <article className={styles.PostDetail}>
      <div className={styles.media}>
        <img src={post.image} alt={post.title} />
      </div>

      <div className={styles.content}>
        <p className={styles.author}>{post.createdBy}</p>
        <h2>{post.title}</h2>
        {previewText && <small className={styles.summary}>{previewText}</small>}

        <div className={styles.tags}>
          {post.tag?.map((tag) => (
            <p key={tag} className={styles.tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>

        <Link to={`/posts/${post.id}`} className={styles.more}>
          Ler post
        </Link>
      </div>
    </article>
  );
};

export default PostDetail;
