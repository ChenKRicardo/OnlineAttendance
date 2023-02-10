let SignModel = require('../model/signs');
let { toZero, toDays } = require('../utils/common');

let createTime = (req, res, next) => {
  req.body.time = {};
  req.body.detail = {};
  for(let i=1;i<=12;i++){
    req.body.time[toZero(i)] = {}
    req.body.detail[toZero(i)] = {}
    for(let j=1;j<=toDays(i);j++){
      req.body.detail[toZero(i)][toZero(j)] = '旷工'
    }
  }
  SignModel.insertMany(req.body).then((ret)=>{
    res.send({"errcode": 0, "errmsg": "ok"})
  }).catch(()=>{
    res.send({"errcode": -2, "errmsg": "error"})
  })
}

let getTime = (req, res, next) => {
  SignModel.findOne(req.query).then((ret)=>{
    res.send({"errcode": 0, "errmsg": "ok", "infos": ret});
  }).catch(()=>{
    res.send({"errcode": -2, "errmsg": "error"});
  })
}

let putTime = (req, res, next) => {
  let date = new Date()
  let month = toZero(date.getMonth()+1)
  let day = toZero(date.getDate())
  let hours = toZero(date.getHours())
  let minus = toZero(date.getMinutes())
  let secos = toZero(date.getSeconds())
  let timeField = `time.${month}.${day}`;
  let timeValue = `${hours}:${minus}:${secos}`;
  let detailField = `detail.${month}.${day}`;
  let detailType;
  const startTime = '08:00:00';
  const endTime = '17:00:00';
  SignModel.findOne(req.body, { [timeField]: 1 }).then((ret)=>{
    if(ret.time[month][day]){
      ret.time[month][day][1] = timeValue

      if( ret.time[month][day][0] > startTime && ret.time[month][day][1] < endTime ){
        detailType = '迟到并早退'
      }
      else if(ret.time[month][day][0] > startTime){
        detailType = '迟到'
      }
      else if( ret.time[month][day][1] < endTime ){
        detailType = '早退'
      }
      else{
        detailType = '正常出勤'
      }

      SignModel.findOneAndUpdate(req.body, {$set: { [timeField]: ret.time[month][day], [detailField]: detailType}}, {new: true}).then((ret)=>{
        res.send({"errcode": 0, "errmsg": "ok", "infos": ret})
      }).catch(()=>{
        res.send({"errcode": -2, "errmsg": "error"});
      })
    }
    else{
      SignModel.findOneAndUpdate(req.body, {$set: { [timeField]: [timeValue], [detailField]: '漏打卡'}}, {new: true}).then((ret)=>{
        res.send({"errcode": 0, "errmsg": "ok", "infos": ret})
      }).catch(()=>{
        res.send({"errcode": -2, "errmsg": "error"});
      })
    }
  })
}

module.exports = {
  getTime,
  putTime,
  createTime
};