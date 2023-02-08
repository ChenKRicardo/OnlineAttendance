import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user';
import { defineStore } from 'pinia';
import { getSignInfo, updateSignInfo } from '@/service';
interface attendanceInfoType {
  [index: string]: any
}
const attendanceInfo: attendanceInfoType = {}
const useUser = useUserStore()
export const useSignStore = defineStore('sign', {
  state: () => ({ attendanceInfo }),
  getters: {
    clearAttendanceInfo(state) {
      state.attendanceInfo = {}
    }
  },
  actions: {
    async getAttendanceInfo() {
      const res = await getSignInfo(useUser.userInfo.infos._id)
      if (res.data.errcode === 0) {
        this.attendanceInfo = res.data.infos
      }
    },
    async updateAttendanceInfo() {
      const res = await updateSignInfo(useUser.userInfo.infos._id)
      if (res.data.errcode === 0) {
        this.attendanceInfo = res.data.infos
        ElMessage.success('签到成功')
      }
    }
  }
})