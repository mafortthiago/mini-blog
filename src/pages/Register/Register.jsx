import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitInfo, setSubmitInfo] = useState("");
  const [clickFeedback, setClickFeedback] = useState("");
  const navigate = useNavigate();
  const {
    createUser,
    error: authError,
    errorCode,
    errorDetails,
    loading,
  } = useAuthentication();

  const handleRegister = async () => {
    setClickFeedback("Clique detectado.");
    setError("");
    setSubmitInfo("");

    const normalizedName = name.trim();
    const normalizedEmail = email.trim();

    if (!normalizedName || !normalizedEmail || !password || !confirmPassword) {
      setError("Preencha todos os campos antes de cadastrar.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setSubmitInfo("Validação OK. Enviando cadastro...");

    const result = await createUser({
      name: normalizedName,
      email: normalizedEmail,
      password,
    });

    if (result?.ok) {
      setSubmitInfo("Cadastro realizado com sucesso. Redirecionando...");
      navigate("/");
      return;
    }

    setSubmitInfo("");
    setError(result?.message || "Falha ao cadastrar.");
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <main className={styles.main}>
      <div className={styles.register}>
        <h2>Cadastre-se no mini-blog.</h2>
        <p className={styles.description}>Faça parte da nossa comunidade!</p>
        <form
          className="form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            handleRegister();
          }}
        >
          <label>
            <span>Nome: </span>
            <input
              type="text"
              name="name"
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            <span>Email: </span>
            <input
              type="email"
              name="email"
              className="input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            <span>Senha: </span>
            <input
              type="password"
              name="password"
              className="input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label>
            <span>Confirme sua senha: </span>
            <input
              type="password"
              name="confirmPassword"
              className="input"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Aguarde" : "Cadastrar"}
          </button>
          {clickFeedback && (
            <p className={styles.messageHint}>{clickFeedback}</p>
          )}
          {error && <p className={styles.messageError}>{error}</p>}
          {errorCode && (
            <p className={styles.messageHint}>Código: {errorCode}</p>
          )}
          {errorDetails && (
            <p className={styles.messageHint}>Detalhe: {errorDetails}</p>
          )}
          {submitInfo && <p className={styles.messageSuccess}>{submitInfo}</p>}
        </form>
      </div>
    </main>
  );
};

export default Register;
