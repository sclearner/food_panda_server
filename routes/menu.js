const express = require('express');
const { search, getMenu, addDish } = require('../controllers/menu');

const router = express.Router();

router.get('/:id', getMenu);
router.get('/search', search);
router.get('/dish/add', addDish);

module.exports = router;