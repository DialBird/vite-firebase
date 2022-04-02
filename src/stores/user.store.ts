import type { User } from "@/domain/entities/User";
import { getUser } from "@/infra/firestore/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async setUser(uid: string) {
      this.user = (await getUser(uid)) as User;
    },
  },
});
