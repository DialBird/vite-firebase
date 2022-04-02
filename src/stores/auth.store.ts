import { getAuth } from "@/infra/setFirebase";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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
    register(email: string, password: string) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(getAuth(), email, password)
          .then((res) => {
            this.currentUser = res.user;
            resolve(res);
          })
          .catch(reject);
      });
    },
  },
});
