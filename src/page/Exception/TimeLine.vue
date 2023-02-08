<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if="false" description="暂无异常考勤" />
      <el-timeline v-else>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <ElSpace>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/12 20:46</p>
            </ElSpace>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <ElSpace>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/12 20:46</p>
            </ElSpace>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <ElSpace>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/12 20:46</p>
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
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <ElSpace>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/12 20:46</p>
            </ElSpace>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
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
import { ref, reactive } from 'vue'
</script>
<style scoped lang='less'>

</style>