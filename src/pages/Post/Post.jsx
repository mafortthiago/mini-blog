import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, increment, updateDoc } from "firebase/firestore";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { db } from "../../services/config";
import styles from "./Post.module.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const reactionOptions = [
  { id: "love", emoji: "😍", label: "Amei" },
  { id: "fire", emoji: "🔥", label: "Brabo" },
  { id: "wow", emoji: "🤯", label: "Surpreendente" },
];

const defaultReactions = {
  love: 0,
  fire: 0,
  wow: 0,
};

const getReadingTime = (text = "") => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
};

const formatPostDate = (createdAt) => {
  if (!createdAt?.toDate) {
    return "Publicado recentemente";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(createdAt.toDate());
};

const Post = () => {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocument("posts", id);
  const [reactionState, setReactionState] = useState(defaultReactions);
  const [selectedReaction, setSelectedReaction] = useState("");
  const [reactionError, setReactionError] = useState("");
  const [isSendingReaction, setIsSendingReaction] = useState(false);

  useEffect(() => {
    if (!post) return;

    setReactionState({
      ...defaultReactions,
      ...post.reactions,
    });

    const storedReaction = window.localStorage.getItem(
      `mini-blog:reaction:${id}`,
    );
    setSelectedReaction(storedReaction || "");
  }, [id, post]);

  const summary = useMemo(() => {
    if (post?.summary?.trim()) {
      return post.summary.trim();
    }

    if (!post?.body) {
      return "";
    }

    return `${post.body.slice(0, 180).trim()}${post.body.length > 180 ? "..." : ""}`;
  }, [post]);

  const readingTime = useMemo(() => getReadingTime(post?.body || ""), [post]);

  const handleReaction = async (reactionId) => {
    if (!post || isSendingReaction) return;

    setReactionError("");
    setIsSendingReaction(true);

    const previousReaction = selectedReaction;
    const nextReaction = previousReaction === reactionId ? "" : reactionId;

    setReactionState((currentReactions) => {
      const updatedReactions = { ...currentReactions };

      if (previousReaction) {
        updatedReactions[previousReaction] = Math.max(
          0,
          (updatedReactions[previousReaction] || 0) - 1,
        );
      }

      if (nextReaction) {
        updatedReactions[nextReaction] =
          (updatedReactions[nextReaction] || 0) + 1;
      }

      return updatedReactions;
    });

    setSelectedReaction(nextReaction);

    try {
      const postRef = doc(db, "posts", id);
      const payload = {};

      if (previousReaction) {
        payload[`reactions.${previousReaction}`] = increment(-1);
      }

      if (nextReaction) {
        payload[`reactions.${nextReaction}`] = increment(1);
      }

      if (Object.keys(payload).length > 0) {
        await updateDoc(postRef, payload);
      }

      if (nextReaction) {
        window.localStorage.setItem(`mini-blog:reaction:${id}`, nextReaction);
      } else {
        window.localStorage.removeItem(`mini-blog:reaction:${id}`);
      }
    } catch {
      setReactionError("Não foi possível registrar sua reação agora.");
      setReactionState({
        ...defaultReactions,
        ...post.reactions,
      });
      setSelectedReaction(previousReaction);
    } finally {
      setIsSendingReaction(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.post}>
        {loading && <LoadingScreen label="Montando o post..." compact />}
        {error && <p className="error">{error}</p>}
        {post && (
          <>
            <div className={styles.hero}>
              <div className={styles.media}>
                <img src={post.image} alt={post.title} />
              </div>

              <div className={styles.intro}>
                <div className={styles.kickerRow}>
                  <span className={styles.author}>
                    <i className="bi bi-person-circle"></i>
                    <span>por {post.createdBy}</span>
                  </span>
                  <span className={styles.dot}></span>
                  <span>
                    <i className="bi bi-calendar3"></i>
                    <span>{formatPostDate(post.createdAT)}</span>
                  </span>
                  <span className={styles.dot}></span>
                  <span>
                    <i className="bi bi-clock-history"></i>
                    <span>{readingTime} min de leitura</span>
                  </span>
                </div>

                <h1>{post.title}</h1>
                {summary && <p className={styles.summary}>{summary}</p>}

                <div className={styles.tags}>
                  {post.tag?.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.bodyGrid}>
              <article className={styles.article}>
                <h2>Leitura</h2>
                <p>{post.body}</p>
              </article>

              <aside className={styles.sidebar}>
                <div className={styles.panel}>
                  <h3>
                    <i className="bi bi-emoji-smile"></i>
                    <span>Clima do post</span>
                  </h3>
                  <p>Escolha uma figurinha para reagir.</p>

                  <div className={styles.reactions}>
                    {reactionOptions.map((reaction) => {
                      const isActive = selectedReaction === reaction.id;

                      return (
                        <button
                          key={reaction.id}
                          type="button"
                          className={`${styles.reactionButton} ${
                            isActive ? styles.reactionButtonActive : ""
                          }`}
                          onClick={() => handleReaction(reaction.id)}
                          disabled={isSendingReaction}
                        >
                          <span className={styles.reactionEmoji}>
                            {reaction.emoji}
                          </span>
                          <span>{reaction.label}</span>
                          <strong>{reactionState[reaction.id] || 0}</strong>
                        </button>
                      );
                    })}
                  </div>

                  {reactionError && <p className="error">{reactionError}</p>}
                </div>

                <div className={styles.panel}>
                  <h3>
                    <i className="bi bi-card-text"></i>
                    <span>Resumo rápido</span>
                  </h3>
                  <ul className={styles.metaList}>
                    <li>Autor: {post.createdBy}</li>
                    <li>Tags: {post.tag?.length || 0}</li>
                    <li>Tempo estimado: {readingTime} min</li>
                  </ul>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <Link className={styles.secondaryBtn} to="/">
          <i className="bi bi-arrow-left"></i>
          <span>Voltar para home</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;
