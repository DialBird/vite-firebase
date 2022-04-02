<script lang="ts" setup>
import {ref} from "vue";

const name = ref('')
const handleSubmit = () => {
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="my-4">Settings</h1>
    <form class="" @submit.prevent="handleSubmit">
      <div class="mb-6">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="name"
        >Your password</label
        >
        <input
          id="name"
          v-model="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
form {
  width: 600px;
}
</style>