var express = require('express');
var router = express.Router();
let { getTime, putTime, createTime } = require('../controller/signs.js');

router.get('/time', getTime)
router.put('/time', putTime)
router.post('/time', createTime)

module.exports = router;
