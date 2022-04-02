import { User, userConverter } from "@/domain/entities/User";
import { getFirestore } from "@/infra/setFirebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const getUsers = async () => {
  const collectionRef = collection(getFirestore(), "users");
  const response = await getDocs(collectionRef);
  return response.docs.map((doc) => doc.data());
};

export const getUser = async (uid: string): Promise<User | undefined> => {
  const docRef = doc(getFirestore(), `users/${uid}`).withConverter(
    userConverter
  );
  const response = await getDoc(docRef);
  return response.data();
};

export const createUser = async ({
  email,
  uid,
  username,
}: {
  email: string;
  uid: string;
  username: string;
}) => {
  const docRef = doc(getFirestore(), `users/${uid}`);
  return await setDoc(docRef, {
    email,
    uid,
    username,
  });
};

export const updateUser = (uid: string) => {};
export const deleteUser = () => {};
