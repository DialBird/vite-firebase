<script lang="ts" setup>
const msg = "hello";
</script>

<template>
  <h1>Hello</h1>
  <router-link :to="{ name: 'About' }">About</router-link>
</template>
