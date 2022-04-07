<script lang="ts" setup>
import {
  createMessage,
  deleteMessage,
  subscribeMessages,
} from "@/infra/firestore/message";
import { useAuthStore } from "@/stores/auth.store";
import { useChatStore } from "@/stores/chat.store";
import type { Unsubscribe } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";

const authStore = useAuthStore();
const chatStore = useChatStore();

const { currentUser } = storeToRefs(authStore);
const { messages } = storeToRefs(chatStore);

const messageInput = ref('')

const onClick = () => {
  if (!currentUser.value || !messageInput.value) return;

  createMessage({
    fromUid: currentUser.value.uid,
    content: messageInput.value,
  });
};

const onClickDelete = (messageUid: string) => {
  deleteMessage(messageUid);
};

const removeListener = ref<Unsubscribe>(() => {});

onMounted(() => {
  removeListener.value = subscribeMessages(
    (data) => {
      chatStore.setMessages(data);
    },
    (err) => {
      console.error(err);
    }
  );
});

onUnmounted(() => {
  removeListener.value();
});
</script>

<template>
  <div class="container mx-auto">
    <h1 class="my-4">Chat</h1>
    <ul>
      <li v-for="message in messages" :key="message.uid" class="mb-4 ml-6">
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
          <button @click="onClickDelete(message.uid)">delete</button>
        </div>
      </li>
    </ul>
    <input v-model="messageInput" type="text" />
    <button @click="onClick">click</button>
  </div>
</template>
