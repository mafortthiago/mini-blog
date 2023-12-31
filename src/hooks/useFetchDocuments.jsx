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
        let q;
        if (search) {
          q = await query(
            collectionRef,
            where("tag", "array-contains", search),
            orderBy("createdAT", "desc")
          );
        } else if (uid) {
          collectionRef, where("uid", "==", uid), orderBy("createdAT", "desc");
        } else {
          q = await query(collectionRef, orderBy("createdAT", "desc"));
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
