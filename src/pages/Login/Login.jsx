import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitInfo, setSubmitInfo] = useState("");
  const navigate = useNavigate();
  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitInfo("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setError("Preencha email e senha.");
      return;
    }

    const result = await login({
      email: normalizedEmail,
      password,
    });

    if (result?.ok) {
      setSubmitInfo("Login realizado com sucesso. Redirecionando...");
      navigate("/");
      return;
    }

    setError(result?.message || "Falha ao entrar.");
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <main className={styles.main}>
      <div className={styles.login}>
        <h2>Entrar</h2>
        <p className={styles.description}>Faça o login</p>
        <form className="form" onSubmit={handleSubmit} noValidate>
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

          {!loading && (
            <button type="submit" className="btn">
              Entrar
            </button>
          )}
          {loading && (
            <button type="submit" className="btn" disabled>
              Aguarde
            </button>
          )}
          {error && <p className={styles.messageError}>{error}</p>}
          {submitInfo && <p className={styles.messageSuccess}>{submitInfo}</p>}
        </form>
      </div>
    </main>
  );
};

export default Login;
