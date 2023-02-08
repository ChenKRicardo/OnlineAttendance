<template>
  <ElCard class=" h-screen">
    <div class=" flex justify-between">
      <el-button-group class=" ml-10">
        <ElButton type="primary" plain>异常处理</ElButton>
      </el-button-group>
      <el-button-group>
        <el-button>
          {{ currentYear }} 年
        </el-button>
        <ElSelect v-model="selectedMonth" class=" w-1/2 ml-5" @change="handleUpdateMonth">
          <ElOption v-for="(item, index) in 12" :key="index" :label="`${item}月`" :value="item" />
        </ElSelect>
      </el-button-group>
    </div>
    <TimeLine class="mt-4"/>
  </ElCard>

</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import TimeLine from './TimeLine.vue';
const currentYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1)
const handleUpdateMonth = () => {
}
</script>
<style scoped lang='less'>

</style>