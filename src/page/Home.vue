<template>
  <ElContainer>
    <ElHeader class=" bg-sky-200 h-1/3">
      <Header />
    </ElHeader>
    <ElContainer>
      <ElAside>
        <Aside />
      </ElAside>
      <ElMain class=" h-full bg-gray-300 m-10 flex-grow ">
        <ElCard>
          <Bread />
          <Main />
        </ElCard>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script setup lang='ts'>
import Main from '@/components/Main.vue';
import Aside from '@/components/Aside.vue';
import Bread from '@/components/Bread.vue';
import Header from '@/components/Header.vue';

import { ref, reactive } from 'vue'
</script>
<style scoped lang='less'>
/deep/.el-aside {
  width: var(--el-aside-width, 200px);
}
</style>