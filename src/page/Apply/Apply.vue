<template>
  <div class=" flex justify-between">
    <ElButton type="primary" @click="dialogVisible = true">添加审批</ElButton>
    <ElSpace>
      <ElInput v-model="searchKey" placeholder="输入搜索关键词" />
      <el-button type="primary" icon="search" @click="searchInfo">搜索</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-radio-group v-model="statusType" @change="changeState">
        <el-radio-button label="待审批" />
        <el-radio-button label="已通过" />
        <el-radio-button label="未通过" />
      </el-radio-group>
    </ElSpace>
  </div>
  <div class="mt-4">
    <el-table :data="pageApplyList" border>
      <el-table-column prop="applicantname" label="申请人" width="180" />
      <el-table-column prop="reason" label="审批事由" width="180" />
      <el-table-column prop="time" label="时间">
        <template #default="scope">
          {{ scope.row.time.join(' - ') }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" />
      <el-table-column prop="approvername" label="审批人" width="180" />
      <el-table-column prop="state" label="状态" width="180" />
    </el-table>
    <el-pagination class=" m-4 float-right" small background layout="prev, pager, next"
      :total="useApply.applyList.length" :page-size="pageSize" @current-change="handleChange" />
  </div>
  <el-dialog v-model="dialogVisible" title="添加审批" width="500px" :before-close="handleClose">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="审批人" prop="approvername">
        <el-select v-model="ruleForm.approvername" placeholder="请选择审批人">
          <el-option v-for="item in approver" :key="(item._id as string)" :value="(item.name as string)"
            :label="(item.name as string)" />
        </el-select>
      </el-form-item>
      <el-form-item label="审批事由" prop="reason">
        <el-select v-model="ruleForm.reason" placeholder="请选择审批事由">
          <el-option v-for="(key, value) in reasonList" :key="key" :value="reasonList[key]" :label="reasonList[key]" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker v-model="ruleForm.time" type="datetimerange" start-placeholder="起始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="ruleForm.note" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { DateModelType, ElMessage, FormInstance, FormRules } from 'element-plus';
import { getApply, postApply, putApply } from '@/service';
import { ref, reactive, computed } from 'vue'
import { ApplyInfo, newApplyInfo } from '@/utils/types';
import { useChecksStore } from '@/store/checks';
import { useUserStore } from '@/store/user';
import dayjs from 'dayjs';
import { useNewsStore } from '@/store/news';
enum reasonList {
  '年假' = '年假',
  '事假' = '事假',
  '病假' = '病假',
  '外出' = '外出',
  '补签卡' = '补签卡',
}
const useApply = useChecksStore()
const useUser = useUserStore()
const newsStore = useNewsStore()
const statusType = ref('待审批')
const pageSize = ref(2)
const pageCurrent = ref(1)
const searchKey = ref()
const dialogVisible = ref(false)
const pageApplyList = computed(() => useApply.applyList.slice((pageCurrent.value - 1) * pageSize.value, pageCurrent.value * pageSize.value))
const approver = computed(() => useUser.userInfo.infos?.approver)
const userPermission = computed(() => (useUser.userInfo.infos?.permission as string[]).includes('check'))

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<ApplyInfo>({
  applicantid: '',
  applicantname: '',
  approverid: '',
  approvername: '',
  note: '',
  reason: '',
  time: ['', '']
})
const validatorTime = (rule: unknown, value: [DateModelType, DateModelType], callback: (arg?: Error) => void) => {
  if (!value[0] && !value[1]) {
    callback(new Error('请选择审批时间'))
  }
  else {
    callback()
  }
}
const rules = reactive<FormRules>({
  approvername: [
    { required: true, message: '请选择审批人', trigger: 'blur' }
  ],
  reason: [
    { required: true, message: '请选择请假事由', trigger: 'blur' }
  ],
  time: [
    { validator: validatorTime, trigger: 'blur' }
  ],
  note: [
    { required: true, message: '请添加审批备注', trigger: 'blur' }
  ]
})
const searchInfo = () => {
  const applicantname = useApply.applyList.find(v => v.applicantname.includes(searchKey.value))?.applicantname
  initApplyData(useUser.userInfo.infos?._id, applicantname, statusType.value, userPermission.value)
}
const handleChange = (nowPage: number) => {
  pageCurrent.value = nowPage
}
const handleClose = () => {
  dialogVisible.value = false
}
const changeState = () => {
  initApplyData(useUser.userInfo.infos?._id, useUser.userInfo.infos?.name, statusType.value, userPermission.value)
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  ruleForm.applicantid = useUser.userInfo.infos?._id
  ruleForm.applicantname = useUser.userInfo.infos?.name
  ruleForm.approverid = approver.value.find((v: { name: string; }) => v.name === ruleForm.approvername)?._id
  ruleForm.time[0] = dayjs(ruleForm.time[0]).format('YYYY-MM-DD hh:mm:ss')
  ruleForm.time[1] = dayjs(ruleForm.time[1]).format('YYYY-MM-DD hh:mm:ss')
  await formEl.validate(async valid => {
    if (valid) {
      const res = await postApply(ruleForm)
      if (res.data.errcode === 0) {
        newsStore.putNews({ userid: ruleForm.applicantid, approver: true })
        ElMessage.success('添加审批成功')
        initApplyData()
      }
    }
  })
  resetForm(ruleFormRef.value)
  handleClose()
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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