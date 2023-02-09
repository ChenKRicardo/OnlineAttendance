<template>
  <div class=" flex justify-between ">
    <section class="flex items-center">
      <i class="iconfont mr-5" :style="{ fontSize: fontSize + 'px' }">&#xe799;</i>
      <i class="iconfont mr-5" :style="{ fontSize: fontSize + 'px' }">&#xe75b;</i>
      <i class="iconfont mr-5" :style="{ fontSize: fontSize + 'px' }">&#xe6a3;</i>
      <span class="font-semibold whitespace-nowrap">在线考勤系统</span>
    </section>
    <figure class="flex cursor-pointer items-center">
      <!-- :hidden="true" -->
      <ElBadge :value="3" class="mt-1 mr-4">
        <i class="iconfont">&#xe8c0;</i>
      </ElBadge>
      <img :src="head" class="w-10 h-10 rounded-full mb-4 mr-5 mt-4 " alt="this is a acvator" />
      <el-dropdown>
        <span class=" text-base font-semibold whitespace-nowrap">{{ name }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>


    </figure>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/store/user';
import { useSignStore } from '@/store/sign';
import { useChecksStore } from '@/store/checks';
defineProps({
  fontSize: Number
})
const signStore = useSignStore()
const userStore = useUserStore()
const applyStroe = useChecksStore()
const head = computed(() => userStore.userInfo.infos?.head)
const name = computed(() => userStore.userInfo.infos?.name)
const handleLogout = () => {
  userStore.clearToken
  signStore.clearAttendanceInfo
  applyStroe.clearAllInfo
  window.location.replace('/login')
}
</script>
<style scoped lang='less'>

</style>