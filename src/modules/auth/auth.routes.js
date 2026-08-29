const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const { validateLogin } = require('./auth.validator');

router.post('/login', validateLogin, controller.login);

module.exports = router;