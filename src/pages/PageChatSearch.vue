<script lang="ts" setup>
import type { Message } from "@/domain/entities/Message";
import { queryMessageWithUid } from "@/infra/firestore/message";
import { useChatStore } from "@/stores/chat.store";
import algoliasearch from "algoliasearch";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);

const searchInput = ref("");

const filteredMessages = ref<Message[]>(messages.value);

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_API_KEY as string,
  import.meta.env.VITE_ALGOLIA_SECRET_KEY as string
);

watch(searchInput, async (val) => {
  if (val === "") {
    filteredMessages.value = messages.value;
  } else {
    filteredMessages.value = await queryMessageWithUid(val);
  }
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="p-4">
      <label class="sr-only" for="table-search">Search</label>
      <AisInstantSearch :search-client="searchClient" index-name="firestore">
        <ais-search-box class="searchbox" placeholder="Search here…" />
        <ais-hits>
          <template v-slot="{ items }">
            <p v-for="item in items" :key="item.objectID">{{ item.content }}</p>
          </template>
        </ais-hits>
      </AisInstantSearch>
      <div class="relative mt-1">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          id="table-search"
          v-model="searchInput"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
          type="text"
        />
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th class="p-4" scope="col">
            <div class="flex items-center">
              <input
                id="checkbox-all-search"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
              />
              <label class="sr-only" for="checkbox-all-search">checkbox</label>
            </div>
          </th>
          <th class="px-6 py-3" scope="col">Product name</th>
          <th class="px-6 py-3" scope="col">Color</th>
          <th class="px-6 py-3" scope="col">Date</th>
          <th class="px-6 py-3" scope="col">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="message in filteredMessages"
          :key="message.uid"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
              />
              <label class="sr-only" for="checkbox-table-search-1"
                >checkbox</label
              >
            </div>
          </td>
          <th
            class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            scope="row"
          >
            {{ message.uid }}
          </th>
          <td class="px-6 py-4">{{ message.content }}</td>
          <td class="px-6 py-4">{{ message.createdAt }}</td>
          <td class="px-6 py-4 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              href="#"
              >Edit</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
