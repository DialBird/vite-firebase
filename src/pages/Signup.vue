<script lang="ts" setup>
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth.store";
import { reactive } from "vue";

const authStore = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
  username: "",
});

const handleSubmit = () => {
  const { email, username, password } = formData;
  authStore.register({ username, email, password }).then(async () => {
    await router.push({ name: "About" });
  });
};
const handleSubmitGoogle = () => {
  authStore.registerWithGoogle().then(async () => {
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
          for="name"
          >Your name</label
        >
        <input
          id="name"
          v-model="formData.username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tarou"
          required
        />
      </div>
      <div class="mb-6">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="email"
          >Your email</label
        >
        <input
          id="email"
          v-model="formData.email"
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
          v-model="formData.password"
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
      <div class="w-full border-t border-gray-300 my-4" />
      <button
        class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        type="button"
        @click.prevent="handleSubmitGoogle"
      >
        <svg
          aria-hidden="true"
          class="w-4 h-4 mr-2 -ml-1"
          data-icon="google"
          data-prefix="fab"
          focusable="false"
          role="img"
          viewBox="0 0 488 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            fill="currentColor"
          ></path>
        </svg>
        Sign in with Google
      </button>
      <p>
        Have account?
        <router-link :to="{ name: 'Login' }" class="underline text-blue-600"
          >Login
        </router-link>
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
