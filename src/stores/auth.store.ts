import { getAuth, getFirestore } from "@/infra/setFirebase";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null as User | null,
  }),
  actions: {
    getCurrentUser(): Promise<User | null> {
      return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
          getAuth(),
          (user) => {
            this.currentUser = user;
            removeListener();
            resolve(user);
          },
          reject
        );
      });
    },
    login(email: string, password: string) {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(getAuth(), email, password)
          .then((res) => {
            this.currentUser = res.user;
            resolve(res);
          })
          .catch(reject);
      });
    },
    register({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(getAuth(), email, password)
          .then(async (res) => {
            const collectionRef = collection(getFirestore(), "users");
            await addDoc(collectionRef, {
              username,
              email,
            });
            this.currentUser = res.user;
            resolve(res);
          })
          .catch(reject);
      });
    },
    registerWithGoogle() {
      return new Promise((resolve, reject) => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), googleProvider)
          .then((res) => {
            this.currentUser = res.user;
            resolve(res);
          })
          .catch(reject);
      });
    },
    signOut() {
      return new Promise((resolve, reject) => {
        signOut(getAuth()).then(resolve).catch(reject);
      });
    },
  },
});
