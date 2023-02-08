<template>
  <ElCard class="mb-4">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="currentRouter in currentRouters" :key="currentRouter.name"
        :to="{ path: `${currentRouter.path}` }">{{ currentRouter.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </ElCard>

</template>

<script setup lang='ts'>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const currentRouters = computed(() => router.currentRoute.value.matched)

</script>
<style scoped lang='less'>

</style>