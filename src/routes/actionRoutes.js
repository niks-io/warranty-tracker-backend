const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const actionController = require('../controllers/actionController');

router.post('/action', userController.adminRequired, actionController.addAction);
router.get('/action/branch', actionController.getBranches);

module.exports = router;