import { useState, useEffect, useReducer } from "react";
import { db } from "../services/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const inicialState = {
  loading: null,
  error: null,
};
const insertReducer = (state, action) => {
  switch (action) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const useInsertDocument = (docColletion) => {
  const [response, dispatch] = useReducer(insertReducer, inicialState);
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };
  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });
    try {
      const newDocument = { ...document, createdAT: Timestamp.now() };
      const insertedDocument = await addDoc(
        collection(db, docColletion),
        newDocument
      );
      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };
  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return { insertDocument, response };
};
