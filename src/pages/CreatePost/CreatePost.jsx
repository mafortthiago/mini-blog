import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePost.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument("posts");

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

    const createdPost = await insertDocument({
      title,
      summary: summary.trim(),
      image,
      body,
      tag: tagArray,
      uid: user.uid,
      createdBy: user.displayName,
      reactions: {
        love: 0,
        fire: 0,
        wow: 0,
      },
    });

    if (createdPost) {
      navigate("/");
    }
  };

  return (
    <main className={styles.main_form}>
      <div className={styles.shell}>
        <aside className={styles.intro}>
          <p className={styles.eyebrow}>Novo post</p>
          <h2>Monte uma publicação que valha a leitura.</h2>
          <p>
            Preencha os campos com um título forte, um resumo curto e tags que
            ajudem a encontrar o conteúdo depois.
          </p>

          <div className={styles.tips}>
            <div className={styles.tipCard}>
              <strong>Título direto</strong>
              Um bom título melhora a leitura logo no primeiro bloco.
            </div>
            <div className={styles.tipCard}>
              <strong>Resumo curto</strong>
              Use esse espaço para vender a ideia principal do texto.
            </div>
          </div>
        </aside>

        <div className={styles.form}>
          <div className={styles.formHeader}>
            <h3>Criar post</h3>
            <p>Compartilhe suas ideias!</p>
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

            {!response.loading && <button className="btn">Criar post!</button>}
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
  );
};

export default CreatePost;
