<template>
  <van-config-provider :theme="(userStore.getTheme as 'light' | 'dark')">
    <RouterView />
  </van-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";

const userStore = useUserStore()
storeToRefs(userStore)


</script>

<style>
#app,
body,
html {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
