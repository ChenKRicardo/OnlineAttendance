import { defineStore } from 'pinia';
import { getInfos } from '@/service';
interface userInfoType {
  [index: string]: any
}
const userInfo: userInfoType = {}
export const useUserStore = defineStore('user', {
  state: () => ({ token: '', userInfo }),
  getters: {
    clearToken(state) {
      return state.token = ''
    }
  },
  actions: {
    async getUserInfos() {
      const res = await getInfos()
      if (res.data.errcode === 0) {
        this.userInfo = res.data
      }
    }
  }
})