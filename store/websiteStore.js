import { defineStore } from 'pinia'
import store from 'store2'
import _ from 'lodash'
const useWebsiteStore = defineStore('websiteStore', {
  state() {
    return {
      websites: []
    }
  },
  actions: {

    add(item) {
      if (_.find(this.websites, { url: item.url })) {
        myApi.alert('此网站已被添加') //直接在这里alert好像会出问题,要用myApi调
      } else {
        // console.log('zundududu', item);
        this.websites.unshift(item)
        // console.log(store);
        store('websites', this.websites)
      }
    },

    //让缓存直接渲染到页面
    init() {
      const cachedWebsites = store.get('websites');
      // console.log(cachedWebsites); // 查看缓存内容
      this.websites = cachedWebsites || []; // 如果缓存为空，初始化为空数组
    },


    deleteItem(url) {
      this.websites = this.websites.filter(item => item.url !== url);
      store('websites', this.websites)//处理完数据重新存储
    },
  },
  getters: {
    //搜索匹配
    find() {
      return (keywords) => {
        // console.log(keywords);
        if (keywords === '') {
          return this.websites
        }
        else {
          const result = _.filter(this.websites, (item) => {
            let partten = new RegExp(keywords, 'i')//正则表达式，模板
            return partten.test(item.title)
          })
          return result
        }

      }
    }
  }

})
export default useWebsiteStore