import styles from "./Login.module.css";

import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);
    console.log(user);
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
        <form className="form" onSubmit={handleSubmit}>
          <label>
            <span>Email: </span>
            <input
              type="email"
              required
              name="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha: </span>
            <input
              type="password"
              required
              name="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {!loading && <input type="submit" value={"Entrar"} className="btn" />}
          {loading && (
            <input type="submit" value={"Aguarde"} className="btn" disabled />
          )}
          {error && <p className={styles.messageError}>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default Login;
