<script setup>
import { inject, ref } from "vue";
import useWebsiteStore from "../../store/websiteStore";
const websiteStore = useWebsiteStore();
const { isShow, setIsShow } = inject("dialog-visible");
// const isShow = ref(false);
const url = ref("http://www.baidu.com");
const isSubmit = ref(false);
const handleAddClick = async () => {
  if (!url.value.trim()) {
    myApi.alert("网址不能为空，请输入网址！");
    return;
  }

  isSubmit.value = true;
  const result = await myApi.sendUrl(url.value);
  if (result.msg) {
    myApi.alert(result.msg);
  } else {
    websiteStore.add(result);
  }
  //操作完对话框关闭
  url.value = "";
  isSubmit.value = false;
  setIsShow(false);
};
</script>

<template>
  <div class="dialog-wrap" v-if="isShow">
    <div class="content">
      <div class="inpput">
        <input
          type="text"
          v-model="url"
          placeholder="请输入网址..."
          @keyup.enter="handleAddClick"
          :disabled="isSubmit"
        />
      </div>
      <div class="btns">
        <button @click="handleAddClick" :disabled="isSubmit">添加</button>
        <button @click="setIsShow(false)" :disabled="isSubmit">取消</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.dialog-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .content {
    width: 100%;
    padding: 0 20px;

    input {
      height: 30px;
      width: 100%;
      outline: none;
      margin-bottom: 10px;
      font-size: 12px;
    }

    .btns {
      button {
        height: 30px;
        margin-right: 10px;
        font-size: 12px;
        padding: 0 20px;
      }
    }
  }
}
</style>



