import { Message, messageConverter } from "@/domain/entities/Message";
import { getFirestore } from "@/infra/setFirebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

export const getMessages = async () => {
  const collectionRef = collection(getFirestore(), "users");
  const response = await getDocs(collectionRef);
  return response.docs.map((doc) => doc.data());
};

export const ons = (): Promise<Message[]> => {
  const collectionRef = collection(getFirestore(), "messages").withConverter(
    messageConverter
  );
  return new Promise((resolve, reject) => {
    onSnapshot(collectionRef, (data) => {
      resolve(data.docs.map((d) => d.data()));
    }, reject);
  });
};

export const createMessage = async (data: Omit<Message, "createdAt">) => {
  const collectionRef = collection(getFirestore(), "messages").withConverter(
    messageConverter
  );
  return await addDoc(collectionRef, { ...data, createdAt: Timestamp.now() });
};

export const deleteMessage = async ()