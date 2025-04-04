import { ref } from 'vue'
const useIndex = () => {
  const currentIndex = ref(0);
  const handleItemClick = (i, url) => {
    currentIndex.value = i;
    //用主进程打开窗口
    myApi.open(url)
  };
  return { currentIndex, handleItemClick }
}
export default useIndex