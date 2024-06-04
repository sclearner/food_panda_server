const express = require('express');
const { register, login, getNewAccessToken, deleteRefreshToken } = require('../controllers/auth');
const { verifyRefreshToken } = require('../middlewares/auth.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', verifyRefreshToken, getNewAccessToken);
router.delete('/logout', deleteRefreshToken);

module.exports = router;