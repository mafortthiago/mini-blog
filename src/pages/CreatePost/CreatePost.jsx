import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className={styles.main_form}>
      <div className={styles.form}>
        <h2>Criar post</h2>
        <p>Compartilhe suas ideias!</p>
        <form onSubmit={handleSubmit} className={"form"}>
          <label>
            <span>Título</span>
            <input
              type="text"
              name="title"
              required
              placeholder="Escreva o título do post"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="input"
            />
          </label>
          <label>
            <span>URL da imagem: </span>
            <input
              type="text"
              name="image"
              required
              placeholder="Insira a URL da imagem"
              onChange={(e) => setImage(e.target.value)}
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
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="input"
              rows={4}
              style={{ resize: "none" }}
            ></textarea>
          </label>
          <label>
            <span>Tags: </span>
            <input
              type="text"
              name="tags"
              required
              placeholder="Escreva as tags separadas por vírgulas"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              className="input"
            />
          </label>
          <input type="submit" value={"Cadastrar"} className="btn" />
          {/* {!loading && (
          <input type="submit" value={"Cadastrar"} className="btn" />
        )}
        {loading && (
          <input type="submit" value={"Aguarde"} className="btn" disabled />
        )}
        {error && <p className={styles.messageError}>{error}</p>} */}
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
