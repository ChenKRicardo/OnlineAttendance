<template>
  <div class=" flex justify-between ">
    <section class="flex items-center">
      <i class="iconfont mr-5" :style="{ fontSize: fontSize + 'px' }">&#xe799;</i>
      <i class="iconfont mr-5" :style="{ fontSize: fontSize + 'px' }">&#xe75b;</i>
      <i class="iconfont mr-5" :style="{ fontSize: fontSize + 'px' }">&#xe6a3;</i>
      <span class="font-semibold whitespace-nowrap">在线考勤系统</span>
    </section>
    <figure class="flex cursor-pointer items-center">
      <ElDropdown>
        <ElBadge :is-dot="hasRemindInfo" class="mt-1 mr-4">
          <i class="iconfont">&#xe8c0;</i>
        </ElBadge>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleNavigate('/apply')" v-if="reminInfo.applicant">有审批结果消息</el-dropdown-item>
            <el-dropdown-item @click="handleNavigate('/check')" v-if="reminInfo.approver">有审批请求消息</el-dropdown-item>
            <el-dropdown-item v-if="!reminInfo.applicant && !reminInfo.approver">暂无消息</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </ElDropdown>
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
import { useRouter } from 'vue-router';
import { useNewsStore } from '@/store/news';
defineProps({
  fontSize: Number
})
const router = useRouter();
const signStore = useSignStore()
const userStore = useUserStore()
const applyStroe = useChecksStore()
const newsStroe = useNewsStore()
const reminInfo = computed(() => newsStroe.reminInfo)
const head = computed(() => userStore.userInfo.infos?.head)
const name = computed(() => userStore.userInfo.infos?.name)
const hasRemindInfo = computed(() => reminInfo.value.applicant || reminInfo.value.approver)
const handleLogout = () => {
  userStore.clearToken
  signStore.clearAttendanceInfo
  applyStroe.clearAllInfo
  window.location.replace('/login')
}
const handleNavigate = (path: string) => {
  router.push(path);
}
</script>
<style scoped lang='less'>

</style>