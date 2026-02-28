import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../services/config";

const AUTH_TIMEOUT_MS = 12000;

const withTimeout = (promise, timeoutMessage) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => {
        reject({
          code: "auth/request-timeout",
          message: timeoutMessage,
        });
      }, AUTH_TIMEOUT_MS);
    }),
  ]);

const getAuthErrorMessage = (authError) => {
  switch (authError.code) {
    case "auth/email-already-in-use":
      return "Email já cadastrado.";
    case "auth/invalid-email":
      return "Email inválido.";
    case "auth/weak-password":
      return "A senha precisa ter no mínimo 6 caracteres.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email ou senha inválidos.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    case "auth/operation-not-allowed":
      return "O método Email/Senha não está habilitado no Firebase Authentication.";
    case "auth/network-request-failed":
      return "Falha de rede. Verifique sua conexão e tente novamente.";
    case "auth/request-timeout":
      return "A solicitação demorou demais para responder.";
    default:
      return "Ocorreu um erro. Tente novamente.";
  }
};

const buildErrorResult = (authError) => ({
  ok: false,
  user: null,
  message: getAuthErrorMessage(authError),
  code: authError.code || "erro-desconhecido",
  details: authError.message || "",
});

const buildCancelledResult = () => ({
  ok: false,
  user: null,
  message: "Operação cancelada.",
  code: "auth/cancelled",
  details: "",
});

const buildSuccessResult = (user) => ({
  ok: true,
  user,
  message: "",
  code: "",
  details: "",
});

const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState("");
  const [errorDetails, setErrorDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    setCancelled(false);
    return () => setCancelled(true);
  }, []);

  const isCancelled = () => cancelled;

  const registerAuthError = (authError) => {
    const errorResult = buildErrorResult(authError);
    setError(errorResult.message);
    setErrorCode(errorResult.code);
    setErrorDetails(errorResult.details);
    return errorResult;
  };

  const clearAuthError = () => {
    setError(null);
    setErrorCode("");
    setErrorDetails("");
  };

  const createUser = async (data) => {
    if (isCancelled()) return buildCancelledResult();

    setLoading(true);
    clearAuthError();

    try {
      const userCredential = await withTimeout(
        createUserWithEmailAndPassword(auth, data.email, data.password),
        "Cadastro sem resposta do Firebase.",
      );

      await withTimeout(
        updateProfile(userCredential.user, { displayName: data.name }),
        "Atualização de perfil sem resposta do Firebase.",
      );

      if (isCancelled()) return buildCancelledResult();

      return buildSuccessResult(userCredential.user);
    } catch (authError) {
      if (isCancelled()) return buildCancelledResult();

      return registerAuthError(authError);
    } finally {
      if (!isCancelled()) {
        setLoading(false);
      }
    }
  };

  const logOut = async () => {
    if (isCancelled()) return false;

    try {
      await signOut(auth);
      return true;
    } catch (authError) {
      if (!isCancelled()) {
        registerAuthError(authError);
      }
      return false;
    }
  };

  const login = async (data) => {
    if (isCancelled()) return buildCancelledResult();

    setLoading(true);
    clearAuthError();

    try {
      const userCredential = await withTimeout(
        signInWithEmailAndPassword(auth, data.email, data.password),
        "Login sem resposta do Firebase.",
      );

      return buildSuccessResult(userCredential.user);
    } catch (authError) {
      if (isCancelled()) return buildCancelledResult();

      return registerAuthError(authError);
    } finally {
      if (!isCancelled()) {
        setLoading(false);
      }
    }
  };

  return {
    auth,
    createUser,
    error,
    errorCode,
    errorDetails,
    loading,
    logOut,
    login,
  };
};

export { useAuthentication };
