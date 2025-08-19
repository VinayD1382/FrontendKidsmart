import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Delete all messages
export const clearMessages = async () => {
  const snapshot = await getDocs(collection(db, "messages"));
  for (let docItem of snapshot.docs) {
    await deleteDoc(doc(db, "messages", docItem.id));
  }
};
