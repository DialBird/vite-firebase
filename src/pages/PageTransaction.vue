<script lang="ts" setup>
import {getFirestore} from "@/infra/setFirebase";
import {useAuthStore} from "@/stores/auth.store";
import {collection, doc, runTransaction} from 'firebase/firestore'

const authStore = useAuthStore();

const addPowerAndLink = async () => {
  if (!authStore.currentUser) return

  const userRef = doc(getFirestore(), `users/${authStore.currentUser.uid}`);
  const powerRef = doc(collection(getFirestore(), `powers`))

  await runTransaction(getFirestore(), async (transaction) => {
    transaction.set(powerRef, { title: 'power' })
    const a = await transaction.get(powerRef)
    transaction.set(userRef, { hoge: new Date() }, { merge: true })
  })
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="my-4">Transaction</h1>
    <button @click="addPowerAndLink">click</button>
  </div>
</template>
