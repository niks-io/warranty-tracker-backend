const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const jobController = require('../controllers/jobController');

router.post('/job', userController.loginRequired, jobController.addJob);

module.exports = router;