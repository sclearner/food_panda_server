const express = require('express');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;