<script lang="ts" setup>
import Alert from "@/components/Alert.vue";
import Header from "@/components/Header.vue";
import { router } from "@/router";
import { useAlertStore } from "@/stores/alert.store";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const authStore = useAuthStore();
const userStore = useUserStore();
const alertStore = useAlertStore();

const { currentUser } = storeToRefs(authStore);
const { alertMsg, alertType } = storeToRefs(alertStore);

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
  <transition name="fade">
    <Alert v-if="alertMsg" :msg="alertMsg" :type="alertType" />
  </transition>
  <router-view></router-view>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transform: scale(1);
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0);
}
</style>
