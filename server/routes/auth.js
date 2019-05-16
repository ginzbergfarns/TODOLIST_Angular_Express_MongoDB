const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/add-user', authController.postAddUser);
router.post('/login', authController.logIn);
router.post('/get-user/:userId', authController.getUser);

module.exports = router;
