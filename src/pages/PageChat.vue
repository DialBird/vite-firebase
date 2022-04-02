<script lang="ts" setup>
import { createMessage, ons } from "@/infra/firestore/message";
import { useChatStore } from "@/stores/chat.store";
import { storeToRefs } from "pinia";

const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);

const onClick = () => {
  createMessage({
    from: "dante",
    content: "jackpod!!",
  });
};

ons().then((data) => {
  console.log('worke', data)
  chatStore.setMessages(data);
}).catch(err => {
  console.error(err)
}) ;
</script>

<template>
  <div class="container mx-auto">
    <h1 class="my-4">Chat</h1>
    <ul>
      <li v-for="message in messages" class="mb-4 ml-6">
        <div
          class="justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600"
        >
          <time
            class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
            >{{ message.createdAt }}
          </time>
          <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
            {{ message.content }}
          </div>
        </div>
      </li>
    </ul>
    <button @click="onClick">click</button>
  </div>
</template>
