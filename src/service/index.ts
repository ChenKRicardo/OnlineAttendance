import service from "@/utils/request";
import { LoginInfo } from '@/utils/types';

export function login(userInfo: LoginInfo) {
  return service.post('/users/login', userInfo)
}
export function getInfos() {
  return service.get('/users/infos')
}
export function getSignInfo(userId: string) {
  return service.get(`/signs/time?${userId}`)
}
export function updateSignInfo(userId: string) {
  return service.put(`/signs/time`, userId)
}