import { defineStore } from 'pinia';
import { putNews, getNewsMind } from '@/service';
import { news } from '@/utils/types';
import { ElMessage } from 'element-plus';
interface Infos {
  [index: string]: any
}
export interface remindState {
  reminInfo: Infos,
}
const state: remindState = {
  reminInfo: {},
}
export const useNewsStore = defineStore('news', {
  state: () => state,
  getters: {
  },
  actions: {
    async putNews(newMind: news) {
      const res = await putNews(newMind)
      if (res.data.errcode === 0) {
        const res = await getNewsMind(newMind.userid)
        if (res.data.errcode === 0) {
          this.reminInfo = res.data.info
        }
      }
    }
  }
})