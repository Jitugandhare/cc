const express = require('express');
const router = express.Router();
const { getChats } = require('../controllers/chatController');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, getChats);

module.exports = router;
