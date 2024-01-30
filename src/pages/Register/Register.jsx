import React from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Register.module.css";
import { useState, useEffect } from "react";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      name,
      email,
      password,
    };
    if (password != confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    const res = await createUser(user);
  
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
        <form className="form" onSubmit={handleSubmit}>
          <label>
            <span>Nome: </span>
            <input
              type="text"
              required
              name="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
          <label>
            <span>Confirme sua senha: </span>
            <input
              type="password"
              required
              name="confirmPassword"
              className="input"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </label>
          {!loading && (
            <input type="submit" value={"Cadastrar"} className="btn" />
          )}
          {loading && (
            <input type="submit" value={"Aguarde"} className="btn" disabled />
          )}
          {error && <p className={styles.messageError}>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default Register;
