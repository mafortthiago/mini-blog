import { db } from "../services/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    let errorMessage;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.name });
      setLoading(false);
      return user;
    } catch (error) {
      if (error.message.includes("Password")) {
        errorMessage = "A senha necessita no mínimo de 6 caracteres ";
      } else if (error.message.includes("email-already")) {
        errorMessage = "Email já cadastrado.";
      } else {
        errorMessage = "Erro! Tente novamente mais tarde";
      }
    }
    setLoading(false);
    setError(errorMessage);
  };
  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return { auth, createUser, error, loading };
};
export { useAuthentication };
