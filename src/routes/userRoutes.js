// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// POST: ทั้งสอง route
router.post('/all', userController.getAllUsers);
router.post('/by-id', userController.getUserById);
router.post('/login', userController.loginUsers);
module.exports = router;
