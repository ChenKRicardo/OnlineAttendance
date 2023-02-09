import { DateModelType } from 'element-plus';
export interface LoginInfo {
  email: string;
  pass: string;
  uuid?: number;
  role?: string;
}
export interface ApplyInfo {
  applicantid: string,
  applicantname: string,
  approverid: string,
  approvername: string,
  note: string,
  reason: string,
  time: [DateModelType, DateModelType]
}
export interface newApplyInfo {
  _id: string,
  state: string
}