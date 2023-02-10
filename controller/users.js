let jwt = require("jsonwebtoken");
let UserModel = require("../model/users");
let NewModel = require("../model/news");
let SignModel = require("../model/signs");
let CheckModel = require("../model/checks");
let { toZero, toDays } = require("../utils/common");
let secret = "chenkang";

let login = (req, res, next) => {
  if (!req.body.email || !req.body.pass) {
    res.send({ errcode: -1, errmsg: "email or pass error" });
    return;
  }
  UserModel.findOne(req.body)
    .then(ret => {
      if (ret) {
        let token = jwt.sign(
          {
            infos: {
              name: ret.name,
              permission: ret.permission,
              _id: ret._id,
              approver: ret.approver,
              head: ret.head,
            },
          },
          secret,
          { expiresIn: 60 * 60 * 1 }
        );
        res.send({ errcode: 0, errmsg: "ok", token: token });
      } else {
        res.send({ errcode: -1, errmsg: "email or pass error" });
      }
    })
    .catch(() => {
      res.send({ errcode: -2, errmsg: "server error" });
    });
};
let register = async (req, res, next) => {
  function addDate() {
    let result = {
      time: {},
      detail: {},
    };
    for (let i = 1; i <= 12; i++) {
      result.time[toZero(i)] = {};
      result.detail[toZero(i)] = {};
      for (let j = 1; j <= toDays(i); j++) {
        result.detail[toZero(i)][toZero(j)] = "旷工";
      }
    }
    return result;
  }
  await UserModel.deleteMany({});
  await NewModel.deleteMany({});
  await SignModel.deleteMany({});
  await CheckModel.deleteMany({});
  await NewModel.insertMany([
    {
      _id: "62771e20fbf556c0012d8e6b",
      userid: "62632f3f674b1e20c841aae2",
      applicant: false,
      approver: false,
    },
    {
      _id: "62771e47fbf556c0012d8e88",
      userid: "626c7236e0c7edf6ce507708",
      applicant: false,
      approver: false,
    },
  ]);
  await SignModel.insertMany([
    {
      _id: "6270e712c23e854258b80514",
      userid: "626c7236e0c7edf6ce507708",
      ...addDate(),
    },
    {
      _id: "62726a1d264b947cdb6e3fa8",
      userid: "62632f3f674b1e20c841aae2",
      ...addDate(),
    },
  ]);
  await UserModel.insertMany([
    {
      _id: "62632f3f674b1e20c841aae2",
      email: "1374575582@qq.com",
      name: "陈康",
      pass: "chenkang",
      head: "http://localhost:3000/uploads/acvator2.jpg",
      permission: ["home", "sign", "exception", "apply"],
      approver: [
        {
          _id: "626c7236e0c7edf6ce507708",
          name: "爱莉西雅",
        },
      ],
      __v: 0,
    },
    {
      _id: "626c7236e0c7edf6ce507708",
      email: "ailixiya@qq.com",
      name: "爱莉西雅",
      pass: "ailixiya",
      head: "http://localhost:3000/uploads/acvator1.jpg",
      permission: ["home", "sign", "exception", "apply", "check"],
      approver: [
        {
          _id: "876d7136e0c9eaf62e503256",
          name: "爱你",
        },
      ],
      __v: 0,
    },
  ])
    .then(ret => {
      res.send({ errcode: 0 });
    })
    .catch(() => {
      res.send({ errcode: -1 });
    });
};
let infos = (req, res, next) => {
  let token = req.headers.authorization;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.send({ errcode: -1, errmsg: "token error" });
    } else {
      res.send({ errcode: 0, errmsg: "infos success", infos: decoded.infos });
    }
  });
};

module.exports = {
  login,
  register,
  infos,
};
