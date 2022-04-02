<script lang="ts" setup>
interface Props {
  msg: string;
  type: "success" | "alert" | "info";
}

withDefaults(defineProps<Props>(), {
  msg: "",
  type: "info",
});
</script>

<template>
  <div
    v-if="type === 'info'"
    class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
    role="alert"
  >
    <svg
      class="inline flex-shrink-0 mr-3 w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        fill-rule="evenodd"
      ></path>
    </svg>
    <div>
      <span class="font-medium">{{ msg }}</span>
    </div>
  </div>
  <div
    v-else-if="type === 'danger'"
    class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
    role="alert"
  >
    <svg
      class="inline flex-shrink-0 mr-3 w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        fill-rule="evenodd"
      ></path>
    </svg>
    <div>
      <span class="font-medium">Danger alert!</span>
    </div>
  </div>
  <div
    v-else
    class="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
    role="alert"
  >
    <svg
      class="inline flex-shrink-0 mr-3 w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        fill-rule="evenodd"
      ></path>
    </svg>
    <div>
      <span class="font-medium">{{ msg }}</span>
    </div>
  </div>
</template>
