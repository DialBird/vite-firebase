<script lang="ts" setup>
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth.store";
import { ref } from "vue";

const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const handleSubmit = () => {
  authStore.register(email.value, password.value).then(async () => {
    await router.push({ name: "About" });
  });
};
</script>

<template>
  <div
    class="p-signup flex justify-center items-center flex-none bg-gray-50 h-screen"
  >
    <form class="bg-white p-4 h-fit rounded-md" @submit.prevent="handleSubmit">
      <h1 class="text-3xl font-bold text-center mb-4">Signup</h1>
      <div class="mb-6">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="email"
          >Your email</label
        >
        <input
          id="email"
          v-model="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
          type="email"
        />
      </div>
      <div class="mb-6">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="password"
          >Your password</label
        >
        <input
          id="password"
          v-model="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          type="password"
        />
      </div>
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        Submit
      </button>
      <p>
        Have account?
        <router-link :to="{ name: 'Login' }" class="underline text-blue-600"
          >Login</router-link
        >
      </p>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.p-signup {
  form {
    width: 600px;
  }
}
</style>
