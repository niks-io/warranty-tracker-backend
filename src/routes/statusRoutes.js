const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const statusController = require('../controllers/statusController');

router.post('/status', userController.loginRequired, statusController.addStatus);

module.exports = router;