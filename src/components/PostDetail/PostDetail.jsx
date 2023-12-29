import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";
const PostDetail = ({ post }) => {
  return (
    <div className={styles.PostDetail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tag.map((tag) => (
          <p key={tag} className={styles.tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className={styles.more}>
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
