<script setup>
//封装之后再说，现在模块化后存储的渲染失败
// import { onMounted, ref } from "vue";
import useWebsites from "./useWebsites";
import useIndex from "./useIndex.js";
// import useWebsiteStore from "../../../store/websiteStore";
// const websiteStore = useWebsiteStore();
const { websiteStore, keywords } = useWebsites();
const { currentIndex, handleItemClick } = useIndex();
// onMounted(() => {
//   websiteStore.init();
// });
// const currentIndex = ref(0);
// const handleItemClick = (i, url) => {
//   currentIndex.value = i;
// };
const handelDelClick = (ws) => {
  websiteStore.deleteItem(ws.url);
  currentIndex.value = 0;
};
</script>

<template>
  <div>
    <p id="no-items" v-if="websiteStore.find(keywords).length <= 0">暂无数据</p>
    <div id="items" v-else>
      <div
        class="read-item"
        v-for="(ws, i) in websiteStore.find(keywords)"
        :key="ws.url"
        :class="{ selected: currentIndex === i }"
        @click="handleItemClick(i, ws.url)"
      >
        <img :src="ws.screenshot" :alt="ws.title" />
        <h2>{{ ws.title }}</h2>
        <button @click.stop="handelDelClick(ws)">x</button>
        <!-- stop的作用就是防止在点击关闭时开启窗口_阻止冒泡 -->
      </div>
    </div>
    <!-- <div>{{ keywords }}</div> -->
  </div>
</template>
<style lang="stylus">
#no-item {
  font-weight: bold;
  color: silver;
  text-align: center;
  width: 100%;
  position: absolute;
  top: 100px;
  z-index: -1;
}

#items {
  .read-item {
    display: flex;
    align-items: center;
    align-content: center;
    border-bottom: lightgray 2px solid;
    background: #fafafa;
    border-left: 10px solid lightgray;
    -webkit-user-select: none;
    position: relative;
    padding: 10px;

    img {
      width: 20%;
      margin-right: 25px;
      border: solid 1px #ccc;
    }

    &:hover {
      background: #eee;
    }

    &:hover button {
      display: inline-block;
    }

    &.selected {
      border-left-color: #3b645f;
    }

    button {
      position: absolute;
      display: none;
      right: 10px;
      top: 10px;
      width: 30px;
      height: 30px;
      background: #f44336;
      border: none;
      border-radius: 50%;
      color: white;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>

