<template>
  <div class="mt-20 w-screen h-screen bg-hero-pattern bg-repeat-x bg-cover">
    <div class="flex justify-center">
      <span>
        <i class="iconfont mr-5" style="fontSize:50px">&#xe799;</i>
        <i class="iconfont mr-5" style="fontSize:50px">&#xe75b;</i>
        <i class="iconfont mr-5" style="fontSize:50px">&#xe6a3;</i>
      </span>
      <h2 class="leading-3 text-3xl">在线考勤系统</h2>
    </div>
    <p class=" text-center text-2xl text-pink-400">基于Vue3+Vite+TS+Tailwindcss的考勤系统</p>
    <ElForm class=" w-2/6 m-auto" ref="loginFormRef" :rules="rules" :model="loginForm">
      <ElFormItem label="账号：" prop="email">
        <ElInput v-model="loginForm.email" placeholder="请输入账号" />
      </ElFormItem>
      <ElFormItem label="密码：" prop="pass">
        <ElInput v-model="loginForm.pass" type="password" placeholder="请输入密码" />
      </ElFormItem>
      <ElFormItem class=" ml-16">
        <ElButton type="primary" @click="submitForm(loginFormRef)">登录</ElButton>
      </ElFormItem>
    </ElForm>
    <div class="flex justify-center">
      <ElRow :gutter="100">
        <ElCol :span="12" v-for="user in userInfo" :key="user.uuid">
          测试账号:<ElButton type="primary" round class=" ml-5" @click="auitoLogin(user)">一键登录</ElButton>
          <div class=" ml-8 whitespace-nowrap">
            <p>角色:{{ user.role }}</p>
            <p>账号:{{ user.email }}</p>
            <p>密码:{{ user.pass }}</p>
          </div>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ElButton, ElCol, ElForm, ElFormItem, ElInput, ElMessage, ElRow, FormInstance, FormRules } from 'element-plus';
import { ref, reactive } from 'vue'
import { useUserStore } from "@/store/user";
import { LoginInfo } from '@/utils/types';
import router from '@/router';
import { login } from '@/service';
const loginForm = reactive<LoginInfo>({
  email: '',
  pass: ''
})
const userInfo: LoginInfo[] = [
  {
    email: '1374575582@qq.com',
    pass: 'chenkang',
    uuid: Math.random() * 10,
    role: '管理员',
  },
  {
    email: 'ailixiya@qq.com',
    pass: 'ailixiya',
    uuid: Math.random() * 10,
    role: '员工',
  },
]
const loginFormRef = ref<FormInstance>()
const userStore = useUserStore()
const rules = reactive<FormRules>({
  email: [
    { required: true, message: '账号不能为空！', trigger: 'blur' }
  ],
  pass: [
    { required: true, message: '密码不能为空！', trigger: 'blur' }
  ]
})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await login(loginForm)
      if (res.data.errcode === 0) {
        userStore.token = res.data.token
        ElMessage.success('登录成功')
        userStore.getUserInfos()
        router.replace('/')
      } else {
        ElMessage.warning(res.data.errmsg)
      }
    }
  })
}
// 一键登录
const auitoLogin = async (userData: LoginInfo) => {
  Object.assign(loginForm, userData)
  submitForm(loginFormRef.value)
}
</script>
<style scoped lang='less'>

</style>