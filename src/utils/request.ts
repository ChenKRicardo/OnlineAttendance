import axios from 'axios';
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';
import router from '@/router';

// create axios instance
const instance = axios.create({
  baseURL: '/api',
  method: 'get',
  timeout: 5000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const userStore = useUserStore()
  const token = userStore.token
  if (token) {
    config.headers.authorization = token
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const userStore = useUserStore()
  if (response.data.errmsg === 'token error') {
    ElMessage.error('token验证失败')
    userStore.clearToken
    router.replace('/login')
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});
export default instance;