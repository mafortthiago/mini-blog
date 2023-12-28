import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // create tag array
    const tagArray = tag.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tag || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL válida.");
      return; //
    }

    console.log(tagArray);

    console.log({
      title,
      image,
      body,
      tag: tagArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tag: tagArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <main className={styles.main_form}>
      <div className={styles.form}>
        <h2>Criar post</h2>
        <p>Compartilhe suas ideias!</p>
        <form onSubmit={handleSubmit} className={"form"}>
          <label>
            <span>Título: </span>
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
            <span>tag: </span>
            <input
              type="text"
              name="tag"
              required
              placeholder="Escreva as tag separadas por vírgulas"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              className="input"
            />
          </label>

          {!response.loading && <button className="btn">Criar post!</button>}
          {response.loading && (
            <button className="btn" disabled>
              Aguarde.. .
            </button>
          )}
          {(response.error || formError) && (
            <p className="error">{response.error || formError}</p>
          )}
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
