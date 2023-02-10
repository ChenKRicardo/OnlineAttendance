<template>
  <el-radio-group class=" float-right mb-4" v-model="statusType" @change="changeState">
    <el-radio-button label="待审批" />
    <el-radio-button label="已通过" />
    <el-radio-button label="未通过" />
  </el-radio-group>
  <el-table :data="pageCheckList" border>
    <el-table-column prop="applicantname" label="申请人" width="180" />
    <el-table-column prop="reason" label="审批事由" width="180" />
    <el-table-column prop="time" label="时间">
      <template #default="scope">
        {{ scope.row.time.join(' - ') }}
      </template>
    </el-table-column>
    <el-table-column prop="note" label="备注" />
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button @click="handlePutApply(scope.row._id, '已通过', scope.row.applicantid)" type="success" icon="check"
          size="small" circle></el-button>
        <el-button @click="handlePutApply(scope.row._id, '未通过', scope.row.applicantid)" type="danger" icon="close"
          size="small" circle></el-button>
      </template>
    </el-table-column>
    <el-table-column prop="state" label="状态" width="180" />
  </el-table>
  <el-pagination class=" m-4 float-right" small background layout="prev, pager, next" :total="useApply.applyList.length"
    :page-size="pageSize" @current-change="handleChange" />
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { newApplyInfo } from '@/utils/types';
import { getApply, postApply, putApply } from '@/service';
import { useChecksStore } from '@/store/checks';
import { useNewsStore } from '@/store/news';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user';
const pageSize = ref(2)
const pageCurrent = ref(1)
const statusType = ref('待审批')
const useApply = useChecksStore()
const newsStore = useNewsStore()
const useUser = useUserStore()
const userPermission = computed(() => (useUser.userInfo.infos?.permission as string[]).includes('check'))

const pageCheckList = computed(() => useApply.applyList.slice((pageCurrent.value - 1) * pageSize.value, pageCurrent.value * pageSize.value))
const handleChange = (nowPage: number) => {
  pageCurrent.value = nowPage
}
const handlePutApply = async (_id: string, state: '已通过' | '未通过', applicantid: string) => {
  const res = await putApply({ _id, state })
  if (res.data.errcode === 0) {
    const res = await getApply(useUser.userInfo.infos?._id)
    if (res.data.errcode === 0) {
      useApply.checkList = res.data.rets
      initApplyData()
    }
    newsStore.putNews({ userid: applicantid, applicant: true })
    ElMessage.success('审批成功')
  }
}
const changeState = () => {
  initApplyData(useUser.userInfo.infos?._id, useUser.userInfo.infos?.name, statusType.value, userPermission.value)
}
const initApplyData = async (applicantid = useUser.userInfo.infos?._id, applicantname: string = useUser.userInfo.infos?.name, state = '待审批', permission: boolean = userPermission.value) => {
  const res = await getApply(applicantid, applicantname, state, permission)
  if (res.data.errcode === 0) {
    useApply.applyList = res.data.rets
  }
}
initApplyData()
</script>
<style scoped lang='less'>

</style>