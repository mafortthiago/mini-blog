import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditPost.module.css";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const EditPost = () => {
  const { id } = useParams();
  const {
    document: post,
    loading: loadingPost,
    error: fetchError,
  } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setImage(post.image);
      setBody(post.body);
      setTitle(post.title);
      setSummary(post.summary || "");
      setTag(post.tag.join(", "));
    }
  }, [post]);

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const tagArray = tag
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    if (!title || !image || !tag || !body) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    if (tagArray.length === 0) {
      setFormError("Informe ao menos uma tag válida.");
      return;
    }

    try {
      new URL(image);
    } catch {
      setFormError("A imagem precisa ser uma URL válida.");
      return;
    }

    const wasUpdated = await updateDocument(id, {
      title,
      summary: summary.trim(),
      image,
      body,
      tag: tagArray,
      uid: user.uid,
      createdBy: user.displayName,
      reactions: {
        love: post.reactions?.love || 0,
        fire: post.reactions?.fire || 0,
        wow: post.reactions?.wow || 0,
      },
    });

    if (wasUpdated) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {loadingPost && <LoadingScreen label="Carregando edição..." compact />}
      {fetchError && <p className="error">{fetchError}</p>}
      {post && (
        <main className={styles.main_form}>
          <div className={styles.shell}>
            <aside className={styles.intro}>
              <p className={styles.eyebrow}>Edição</p>
              <h2>Ajuste o texto e refine a apresentação.</h2>
              <p>
                Revise a imagem, o resumo e as tags para deixar o post mais
                claro e mais fácil de encontrar.
              </p>

              <div className={styles.previewPanel}>
                <p className={styles.p_preview}>Pré-visualização da imagem</p>
                <img
                  src={image}
                  alt={post.title}
                  className={styles.img_preview}
                />
              </div>
            </aside>

            <div className={styles.form}>
              <div className={styles.formHeader}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => navigate("/dashboard")}
                >
                  Voltar
                </button>
                <h3>Editar post</h3>
                <p>Atualize o conteúdo com mais contexto e clareza.</p>
              </div>
              <form onSubmit={handleSubmit} className="form">
                <label>
                  <span>Título: </span>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Escreva o título do post"
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                    className="input"
                  />
                </label>
                <label>
                  <span>Resumo: </span>
                  <textarea
                    name="summary"
                    placeholder="Escreva um resumo curto para destacar a leitura"
                    onChange={(event) => setSummary(event.target.value)}
                    value={summary}
                    className="input"
                    rows={3}
                    maxLength={220}
                    style={{ resize: "none" }}
                  ></textarea>
                </label>
                <label>
                  <span>URL da imagem: </span>
                  <input
                    type="text"
                    name="image"
                    required
                    placeholder="Insira a URL da imagem"
                    onChange={(event) => setImage(event.target.value)}
                    value={image}
                    className="input"
                  />
                </label>
                <label>
                  <span>Conteúdo: </span>
                  <textarea
                    name="body"
                    required
                    placeholder="Escreva sua ideia"
                    onChange={(event) => setBody(event.target.value)}
                    value={body}
                    className="input"
                    rows={8}
                    style={{ resize: "none" }}
                  ></textarea>
                </label>
                <label>
                  <span>Tags: </span>
                  <input
                    type="text"
                    name="tag"
                    required
                    placeholder="Escreva as tags separadas por vírgulas"
                    onChange={(event) => setTag(event.target.value)}
                    value={tag}
                    className="input"
                  />
                </label>

                {!response.loading && (
                  <button className="btn">Editar post</button>
                )}
                {response.loading && (
                  <button className="btn" disabled>
                    Aguarde...
                  </button>
                )}
                {(response.error || formError) && (
                  <p className="error">{response.error || formError}</p>
                )}
              </form>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default EditPost;
