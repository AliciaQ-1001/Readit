<script setup>
import { provide, ref } from "vue";
import Home from "./views/Home.vue";

const isShow = ref(false);
const setIsShow = (value) => {
  isShow.value = value;
};
provide("dialog-visible", {
  isShow,
  setIsShow,
});
</script>

<template>
  <Home />
</template>

<style lang="css">
</style>

