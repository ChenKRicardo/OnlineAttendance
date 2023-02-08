<template>
  <el-menu :default-active="currentRouter" :default-openeds="['/']" class="el-menu-vertical-demo mt-10"
    :collapse="isCollapse" router>
    <el-sub-menu :index="`${route.path}`" v-for="route in routes" :key="route.name">
      <template #title>
        <el-icon>
          <component :is="route.meta?.icon"></component>
        </el-icon>
        <span>{{ route.meta?.title }}</span>
      </template>
      <el-menu-item-group v-for="childRoute in route.children" :key="childRoute.path">
        <el-menu-item :index="`${route.path}${childRoute.path}`">
          <el-icon>
            <component :is="childRoute.meta?.icon"></component>
          </el-icon>
          {{ childRoute.meta?.title }}
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-icon class=" float-right mr-4 text-xl mt-10">
      <DArrowLeft v-if="!isCollapse" @click="handleClose" />
      <DArrowRight v-else @click="handleOpen" />
    </el-icon>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, toRaw, computed } from 'vue';
import _ from 'lodash';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue';
import { ElMenu, ElSubMenu, ElIcon, ElMenuItemGroup, ElMenuItem } from 'element-plus';
const router = useRouter()
const userStore = useUserStore()
const permission = toRaw(userStore.userInfo.infos?.permission)
const routes = _.cloneDeep(router.options.routes).filter(v => {
  v.children = v.children?.filter(c => c.meta?.menu && permission?.includes(c.name))
  return v.meta?.menu && permission?.includes(v.name)
})
const currentRouter = computed(() => router.currentRoute.value.path)

const isCollapse = ref(false)
const handleOpen = () => {
  isCollapse.value = false
}
const handleClose = () => {
  isCollapse.value = true
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: calc(100vh - 60px);
}
</style>
