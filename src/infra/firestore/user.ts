import { getFirestore } from "@/infra/setFirebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const getUsers = async () => {
  const collectionRef = collection(getFirestore(), "users");
  const response = await getDocs(collectionRef);
  return response.docs.map((doc) => doc.data());
};

export const createUser = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const collectionRef = collection(getFirestore(), "users");
  return await addDoc(collectionRef, {
    username,
    email,
  });
};

export const updateUser = () => {}
export const deleteUser = () => {}
