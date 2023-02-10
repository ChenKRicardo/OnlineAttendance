import { defineStore } from 'pinia';
import { getApply } from '@/service';

interface Infos {
  [index: string]: any
}

export interface ChecksState {
  applyList: Infos[],
  checkList: Infos[]
}
const state: ChecksState = {
  applyList: [],
  checkList: []
}
export const useChecksStore = defineStore('checks', {
  state: () => state,
  getters: {
    clearAllInfo(state) {
      state.applyList = []
      state.checkList = []
    }
  }
})