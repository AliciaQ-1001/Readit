<script setup>
import { onMounted, ref } from "vue";
const filelist = ref([]);
onMounted(async () => {
  const files = await myApi.getFilelist();
  filelist.value = files;
});
</script>

<template>
  <div class="img-container">
    <img
      v-for="fl in filelist"
      :key="fl.index"
      :src="`/uploads/${fl}`"
      alt=""
    />
  </div>
</template>

<style lang="stylus">
.img-container {
  padding: 20px;

  img {
    width: 150px;
    margin-right: 10px;
  }
}
</style>

