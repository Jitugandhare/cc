const express = require('express');
const router = express.Router();
const { createHelpRequest, getHelpRequests } = require('../controllers/helpController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, createHelpRequest);
router.get('/', authenticateToken, getHelpRequests);

module.exports = router;
