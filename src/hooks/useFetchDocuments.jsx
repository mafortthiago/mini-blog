import { useState, useEffect } from "react";
import { db } from "../services/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        if (search) {
          let q = await query(
            collectionRef,
            where("tags", "array-contains", search),
            orderBy("createdAT", "desc")
          );
        } else {
          let q = await query(collectionRef, orderBy("createdAT", "desc"));
        }
        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    loadData();
  }, [docCollection, search, uid, cancelled]);
  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return { documents, loading, error };
};
