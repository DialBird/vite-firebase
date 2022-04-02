<script lang="ts" setup>
import { updateUser } from "@/infra/firestore/user";
import { getStorage } from "@/infra/setFirebase";
import { useAlertStore } from "@/stores/alert.store";
import { useUserStore } from "@/stores/user.store";
import {
  getDownloadURL,
  ref as sref,
  uploadBytesResumable,
} from "firebase/storage";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const alertStore = useAlertStore();
const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const username = ref(user.value?.username);
const profileUrl = ref(user.value?.profileUrl);
const fileInputValue = ref<File>();
const uploadProgress = ref<number>(0);

const onFileChanged = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input && input.files) {
    fileInputValue.value = input.files[0];
  }
};

const handleSubmit = async () => {
  if (!user.value) return;

  if (fileInputValue.value) {
    const storageRef = sref(
      getStorage(),
      `users/${user.value.uid}/${fileInputValue.value.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, fileInputValue.value);
    const uid = user.value.uid;
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        uploadProgress.value =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (profileUrl) => {
          await updateUser(uid, { username: username.value, profileUrl }).then(
            () => {
              alertStore.setAlert("updated!!", "success");
            }
          );
        });
      }
    );
  } else {
    await updateUser(user.value.uid, { username: username.value }).then(() => {
      alertStore.setAlert("updated!!", "success");
    });
  }
};

watch(user, (val) => {
  username.value = val?.username;
  profileUrl.value = val?.profileUrl
});
</script>

<template>
  <div class="container mx-auto">
    <h1 class="my-4">Settings</h1>
    <form class="" @submit.prevent="handleSubmit">
      <div class="mb-6">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="name"
          >Your username</label
        >
        <input
          id="name"
          v-model="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-6">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="user_avatar"
          >Upload file</label
        >
        <input
          id="user_avatar"
          accept="image/*"
          aria-describedby="user_avatar_help"
          class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          @change.prevent="onFileChanged"
        />
        <img v-if="profileUrl" :src="profileUrl" alt="profile" width="100" />
        <div
          id="user_avatar_help"
          class="mt-1 text-sm text-gray-500 dark:text-gray-300"
        >
          A profile picture is useful to confirm your are logged into your
          account
        </div>
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
