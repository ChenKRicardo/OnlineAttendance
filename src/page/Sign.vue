<template>
  <ElCard>
    <AttendanceInfo :selectedMonth="selectedMonth" />
    <el-calendar v-model="nowDate">
      <template #header>
        <el-button type="primary" plain @click="onlineCheck">
          在线签到
        </el-button>
        <el-button-group>
          <el-button>
            {{ nowYear }} 年
          </el-button>
          <ElSelect v-model="selectedMonth" class=" w-1/2 ml-5" @change="handleUpdateMonth">
            <ElOption v-for="(item, index) in 12" :key="index" :label="`${item}月`" :value="item" />
          </ElSelect>
        </el-button-group>
      </template>
      <template #dateCell="{ data }">
        <p>{{ renderDay(data.day, data) }}</p>
        <p class=" whitespace-nowrap text-center overflow-hidden text-ellipsis">{{ renderTime(data.day) }}</p>
      </template>
    </el-calendar>
  </ElCard>
</template>

<script setup lang='ts'>
import AttendanceInfo from '@/components/AttendanceInfo.vue';
import { ref, reactive, onMounted, onBeforeMount, nextTick } from 'vue'
import { useSignStore } from '@/store/sign';
import _ from 'lodash';

const useSign = useSignStore()
const nowDate = ref(new Date())
const nowYear = new Date().getFullYear()
const selectedMonth = ref(nowDate.value.getMonth() + 1)
interface checkedData {
  data: Date,
  day: string,
  isSelected: Boolean,
  type: String
}
const onlineCheck = () => {
  useSign.updateAttendanceInfo()
}
const handleUpdateMonth = (val: string) => {
  nowDate.value = new Date(`${nowYear}.${val}`)
}
onMounted(() => {
  if (_.isEmpty(useSign.attendanceInfo)) {
    useSign.getAttendanceInfo()
  }

})
const renderDay = (day: string, data: checkedData) => {
  if (data.isSelected) {
    selectedMonth.value = Number(data.day.split('-')[1].split('')[1])
  }
  return day.split('-')[2]
}
const renderTime = (day: string) => {
  if (!_.isEmpty(useSign.attendanceInfo)) {
    const [, month, date] = day.split('-');
    const rest = useSign.attendanceInfo?.time[month][date]
    if (Array.isArray(rest)) {
      return rest.join('-')
    }
  }
}




</script>
<style scoped lang='less'>

</style>

