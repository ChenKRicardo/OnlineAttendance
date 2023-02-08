<template>
  <el-descriptions :column="10" direction="vertical" border>
    <el-descriptions-item label="月份">
      {{ selectedMonth? selectedMonth: new Date().getMonth() + 1 }}
      {{ (selectedMonth && selectedMonth.toString()?.indexOf('月') !== -1) ? '' : '月'}}
    </el-descriptions-item>
    <el-descriptions-item v-for="(value, key) in detailEnums" :key="key" :label="`${detailEnums[key]}`">{{
      detailInfos[key]
    }}</el-descriptions-item>
    <el-descriptions-item label="考勤状态">
      <el-tag size="small" :type="currentStatu.type">{{ currentStatu.text }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="操作">
      <template #default>
        <ElButton type="primary" plain size="small" @click="viewDetail">查看详情</ElButton>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang='ts'>
import { ref, reactive, watchEffect, toRaw } from 'vue'
import { useRouter } from 'vue-router';
import { useToZero } from '@/hooks/useToZero';
import { useSignStore } from '@/store/sign';
import _ from 'lodash'

const props = defineProps(['selectedMonth'])
const useSign = useSignStore()
const router = useRouter()
enum detailEnums {
  normal = "正常执勤",
  absent = '旷工',
  forget = '漏打卡',
  late = '迟到',
  early = '早退',
  lateAndEarly = '迟到并早退',
}
interface status {
  type: 'danger' | 'success',
  text: '正常' | '异常'
}
interface dataType {
  [index: string]: any
}
const currentStatu = reactive<status>({
  type: 'danger',
  text: '异常'
})
const detailInfos = reactive<dataType>({
  normal: 0,
  absent: 0,
  forget: 0,
  late: 0,
  early: 0,
  lateAndEarly: 0,
})
const viewDetail = () => {
  router.push({
    path: '/exception',
    query: { month: props.selectedMonth }
  });
}

watchEffect((resetting) => {
  if (!_.isEmpty(useSign.attendanceInfo)) {
    const detailMonth = useSign.attendanceInfo?.detail[useToZero(props.selectedMonth) as any]
    for (const attr in detailMonth) {
      switch (detailMonth[attr]) {
        case detailEnums.normal:
          detailInfos.normal++
          break
        case detailEnums.absent:
          detailInfos.absent++
          break
        case detailEnums.forget:
          detailInfos.forget++
          break
        case detailEnums.late:
          detailInfos.late++
          break
        case detailEnums.early:
          detailInfos.early++
          break
        case detailEnums.lateAndEarly:
          detailInfos.lateAndEarly++
          break
      }
    }
  }
  for (const key in detailInfos) {
    if (key !== 'normal' && detailInfos[key as keyof typeof detailInfos] !== 0) {
      currentStatu.type = 'danger'
      currentStatu.text = '异常'
    }
  }
  resetting(() => {
    currentStatu.type = 'success'
    currentStatu.text = '正常'
    for (const key in detailInfos) {
      detailInfos[key as keyof typeof detailInfos] = 0
    }
  })
})
</script>
<style scoped lang='less'>

</style>