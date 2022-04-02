<script lang="ts" setup>
const msg = "hello";
</script>

<template>
  <h1>About</h1>
  <router-link :to="{ name: 'Home' }">Home</router-link>
</template>