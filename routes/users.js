var express = require('express');
var router = express.Router();
let { login, register, infos } = require('../controller/users.js');

router.post('/login', login)
router.post('/register', register)
router.get('/infos', infos)

module.exports = router;
