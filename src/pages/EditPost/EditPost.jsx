import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formError, setFormError] = useState("");
  const handleImageChange = (e) => {
    setImage(e.target.value);
  };
  useEffect(() => {
    if (post) {
      setImage(post.image);
      setBody(post.body);
      setTitle(post.title);
      setTag(post.tag.join(", "));
    }
  }, [post]);

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    const tagArray = tag.split(",").map((tag) => tag.trim().toLowerCase());
    if (!title || !image || !tag || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL válida.");
      return;
    }

    if (formError) return;

    updateDocument(id, {
      title,
      image,
      body,
      tag: tagArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/dashboard");
  };

  return (
    <>
      {post && (
        <main className={styles.main_form}>
          <div className={styles.form}>
            <h2>Edite o post:</h2>
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
                  onChange={handleImageChange}
                  value={image}
                  className="input"
                />
                <p className={styles.p_preview}>Pré visualização da imagem:</p>
                <img
                  src={image}
                  alt={post.title}
                  className={styles.img_preview}
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
                  placeholder="Escreva as tags separadas por vírgulas"
                  onChange={(e) => setTag(e.target.value)}
                  value={tag}
                  className="input"
                />
              </label>

              {!response.loading && (
                <button className="btn">Editar post</button>
              )}
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
      )}
    </>
  );
};

export default EditPost;
