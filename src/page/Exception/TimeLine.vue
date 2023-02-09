<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if="props.actualSatus.length === 0" description="暂无异常考勤" />
      <el-timeline v-else>
        <el-timeline-item v-for="time in props.actualSatus" :key="time[0]"
          :timestamp="`${currentYear}/${selectedMonth}/${time[0].split('')[0] === '0' ? time[0].split('')[1] : time[0]}`"
          placement="top">
          <el-card>
            <ElSpace>
              <h4>{{ time[1]}}</h4>
              <p>考勤详情:{{ renderTime(time[0]) }}</p>
            </ElSpace>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="12">
      <el-empty v-if="approvalMenu.length === 0" description="暂无申请审批" />
      <el-timeline v-else>
        <el-timeline-item v-for="approver in approvalMenu" :key="approver._id" :timestamp="approver.reason"
          placement="top">
          <el-card>
            <h4>{{ approver.state }}</h4>
            <p>申请日期:{{`${approver.time[0]}-${approver.time[1]} `}}</p>
            <p>申请详情:{{ approver.note }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
import { useToZero } from '@/hooks/useToZero';
import { useChecksStore } from '@/store/checks';
import { useSignStore } from '@/store/sign';
import _ from 'lodash';
import { ref, reactive, computed } from 'vue'
const props = defineProps(['actualSatus', 'selectedMonth', 'currentYear'])
const useSign = useSignStore()
const useCheck = useChecksStore()
const approvalMenu = computed(() =>
  useCheck.applyList.filter(v => {
    const startTime = Number((v.time[0] as string).split('-')[1].split('')[1])
    const endTime = Number((v.time[0] as string).split('-')[1].split('')[1])
    return startTime <= useToZero(props.selectedMonth) && endTime >= useToZero(props.selectedMonth)
  }))
const renderTime = (date: string) => {
  if (!_.isEmpty(useSign.attendanceInfo)) {
    const clockTime = useSign.attendanceInfo?.time[useToZero(props.selectedMonth) as any][date]
    if (Array.isArray(clockTime)) {
      return clockTime.join('-')
    } else {
      return '暂无打卡记录'
    }
  }
}

</script>
<style scoped lang='less'>

</style>