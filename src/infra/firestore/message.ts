import { Message, messageConverter } from "@/domain/entities/Message";
import { getFirestore } from "@/infra/setFirebase";
import { KeyGenerator } from "@/utils/KeyGenerator";
import type {
  FirestoreError,
  Query,
  QuerySnapshot,
  Unsubscribe,
} from "firebase/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";

export const getMessages = async () => {
  const collectionRef = collection(getFirestore(), "users");
  const response = await getDocs(collectionRef);
  return response.docs.map((doc) => doc.data());
};

export const subscribeMessages = (
  resolve: (d: Message[]) => void,
  reject: (error: FirestoreError) => void
): Unsubscribe => {
  const collectionRef = collection(getFirestore(), "messages").withConverter(
    messageConverter
  );

  return onSnapshot(
    collectionRef,
    (data: QuerySnapshot<Message>) => {
      resolve(data.docs.map((d) => d.data()));
    },
    reject
  );
};

export const queryMessageWithUid = async (queryString: string): Promise<Message[]> => {
  const collectionRef = collection(getFirestore(), "messages").withConverter(
    messageConverter
  );
  const q = query(collectionRef, where("uid", "==", queryString));
  const response = await getDocs(q);
  return response.docs.map((doc) => doc.data());
};

export const createMessage = async (
  data: Omit<Message, "uid" | "createdAt">
) => {
  const uid = KeyGenerator.generateUid();
  const docRef = doc(getFirestore(), `messages/${uid}`).withConverter(
    messageConverter
  );
  return await setDoc(docRef, {
    ...data,
    uid,
    createdAt: Timestamp.now(),
  });
};

export const deleteMessage = async (uid: string): Promise<void> => {
  const docRef = doc(getFirestore(), `messages/${uid}`);
  return await deleteDoc(docRef);
};
