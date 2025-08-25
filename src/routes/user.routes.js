const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// User routes
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);

module.exports = router;
