let NewModel = require('../model/news');


let getRemind = (req, res, next) => {
  NewModel.findOne(req.query).then((ret)=>{
    res.send({"errcode": 0, "errmsg": "ok", "info": ret});
  }).catch(()=>{
    res.send({"errcode": -2, "errmsg": "error"});
  })
}
let putRemind = (req, res, next) => {
  NewModel.findOneAndUpdate({userid: req.body.userid}, {$set: req.body}, {new: true}).then((ret)=>{
    res.send({"errcode": 0, "errmsg": "ok", "info": ret});
  }).catch((err)=>{
    res.send({"errcode": -2, "errmsg": "error"});
  })
}

module.exports = {
  getRemind,
  putRemind
};