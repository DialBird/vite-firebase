<script lang="ts" setup>
import Header from "@/components/Header.vue";
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const authStore = useAuthStore();
const userStore = useUserStore();

const { currentUser } = storeToRefs(authStore);

const signOut = () => {
  authStore.signOut().then(() => {
    router.push({ name: "Login" });
  });
};

onMounted(() => {
  userStore.setUser(currentUser.value!.uid);
});
</script>

<template>
  <Header @signout="signOut" />
  <router-view></router-view>
</template>
