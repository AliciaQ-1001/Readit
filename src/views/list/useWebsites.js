import { onMounted, inject } from "vue";
import useWebsiteStore from "../../../store/websiteStore";


const useWebsites = () => {
  const websiteStore = useWebsiteStore();
  const { keywords } = inject('searchbar-keywords')//要写在钩子函数里面
  onMounted(() => {
    websiteStore.init();
  });
  return {
    websiteStore,
    keywords
  }
}
export default useWebsites