import { useEffect, useState } from "react";
import { db } from "../services/config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const collectionRef = collection(db, docCollection);

    try {
      let q;

      if (search) {
        q = query(
          collectionRef,
          where("tag", "array-contains", search),
          orderBy("createdAT", "desc"),
        );
      } else if (uid) {
        q = query(
          collectionRef,
          where("uid", "==", uid),
          orderBy("createdAT", "desc"),
        );
      } else {
        q = query(collectionRef, orderBy("createdAT", "desc"));
      }

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
          setLoading(false);
        },
        (snapshotError) => {
          setError(snapshotError.message);
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (queryError) {
      setError(queryError.message);
      setLoading(false);

      return undefined;
    }
  }, [docCollection, search, uid]);

  return { documents, loading, error };
};
