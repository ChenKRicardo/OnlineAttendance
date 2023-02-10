var express = require('express');
var router = express.Router();
let { getApply, putApply, createApply } = require('../controller/checks.js');

router.get('/apply', getApply)
router.post('/apply', createApply)
router.put('/apply', putApply)

module.exports = router;
