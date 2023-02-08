<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if="false" description="暂无异常考勤" />
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
      <el-empty v-if="false" description="暂无申请审批" />
      <el-timeline v-else>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <ElSpace>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/12 20:46</p>
            </ElSpace>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
import { useToZero } from '@/hooks/useToZero';
import { useSignStore } from '@/store/sign';
import _ from 'lodash';
import { ref, reactive } from 'vue'
const props = defineProps(['actualSatus', 'selectedMonth', 'currentYear'])
const useSign = useSignStore()
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