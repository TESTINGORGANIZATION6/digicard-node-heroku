const router = require('express').Router();

const { addOrder } = require('../controllers/order');

router.post('/addorder', addOrder);

module.exports = router;