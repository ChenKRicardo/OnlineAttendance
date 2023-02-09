<template>

  <div class="check-table">
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
    <!-- <el-pagination small background layout="prev, pager, next" :total="checkList.length" :page-size="pageSize"
      @current-change="handleChange" /> -->
  </div>

</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
const pageSize = ref(2)
const pageCurrent = ref(1)
const pageCheckList = computed(() => checkList.value.slice((pageCurrent.value - 1) * pageSize.value, pageCurrent.value * pageSize.value))
const handlePutApply = (_id: string, state: '已通过' | '未通过', applicantid: string) => { }

</script>
<style scoped lang='less'>

</style>