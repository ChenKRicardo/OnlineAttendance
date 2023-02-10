var express = require('express');
var router = express.Router();
let { getRemind, putRemind } = require('../controller/news.js');

router.get('/remind', getRemind)
router.put('/remind', putRemind)

module.exports = router;
