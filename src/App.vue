<script setup>
import { provide, ref } from "vue";
import Header from "./views/Header.vue";
// import Home from "./views/Home.vue";

const isShow = ref(false);
const setIsShow = (value) => {
  isShow.value = value;
};
provide("dialog-visible", {
  isShow,
  setIsShow,
});
//搜索的关键字定义
const keywords = ref("");
const setKeywords = (value) => {
  keywords.value = value;
};
provide("searchbar-keywords", {
  keywords,
  setKeywords,
});
</script>

<template>
  <!-- <Home /> -->
  <Header></Header>
  <router-view></router-view>
</template>

<style lang="css">
</style>

