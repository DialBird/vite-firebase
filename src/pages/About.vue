<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);
</script>

<template>
  <h1>About</h1>
  <router-link :to="{ name: 'Home' }">Home</router-link>
  <p>{{ currentUser.email }}</p>
</template>
