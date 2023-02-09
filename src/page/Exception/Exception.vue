<template>
  <div class=" flex justify-between">
    <el-button-group class=" ml-10">
      <ElButton type="primary" @click="handleException">异常处理</ElButton>
    </el-button-group>
    <el-button-group>
      <el-button>
        {{ currentYear }} 年
      </el-button>
      <ElSelect v-model="selectedMonth" class=" w-1/2 ml-5">
        <ElOption v-for="(item, index) in 12" :key="index" :label="`${item}月`" :value="item" />
      </ElSelect>
    </el-button-group>
  </div>
  <TimeLine class="mt-4" :actualSatus="actualSatus" :selectedMonth="selectedMonth" :currentYear="currentYear" />
</template>

<script setup lang='ts'>
import { useToZero } from '@/hooks/useToZero';
import { useSignStore } from '@/store/sign';
import { ref, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TimeLine from './TimeLine.vue';
const router = useRouter()
const useSign = useSignStore()
const routerQuery = useRoute()
const currentYear = ref(new Date().getFullYear())
const selectedMonth = ref(Number(routerQuery.query.month) || new Date().getMonth() + 1)
const detailMonth = useSign.attendanceInfo?.detail[useToZero(selectedMonth.value) as any]
const actualSatus = computed(() => Object.entries(detailMonth).filter(v => v[1] !== '正常出勤').sort())
watch(selectedMonth, () => {
  router.push({
    query: { month: selectedMonth.value }
  });
})
const handleException = () => {
  router.push('/apply')
}

</script>
<style scoped lang='less'>

</style>