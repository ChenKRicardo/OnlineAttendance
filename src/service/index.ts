import service from "@/utils/request";
import { LoginInfo, ApplyInfo, newApplyInfo } from '@/utils/types';

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
export function getApply(applicantid: string, applicantname: string, state: string) {
  return service.get(`/checks/apply/?applicantid=${applicantid}&applicantname=${applicantname}&state=${state}`)
}
export function postApply(applyInfo: ApplyInfo) {
  return service.post(`/checks/apply`, applyInfo)
}
export function putApply(putApplyInfo: newApplyInfo) {
  return service.put(`/checks/apply`, putApplyInfo)
}