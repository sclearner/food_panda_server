const express = require('express');
const { getMenu, addDish, addMenu} = require('../controllers/menu');

const router = express.Router();

router.get('/:id', getMenu);
router.post('/dish/add', addDish);
router.post('/add', addMenu);

module.exports = router;