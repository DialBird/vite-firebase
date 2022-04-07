<script lang="ts" setup>
import { subscribeMessages } from "@/infra/firestore/message";
import { useChatStore } from "@/stores/chat.store";
import type { Unsubscribe } from "firebase/firestore";
import { onMounted, onUnmounted, ref } from "vue";

const chatStore = useChatStore();

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
  <router-view />
</template>
