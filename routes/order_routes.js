const router = require('express').Router();

const { 
    addOrder,
    getOrderById,
    listOrders,
    listOrderById
} = require('../controllers/order');

router.post('/addorder', addOrder);
router.get('/getorders', listOrders);
router.get('/getorder/:orderId', getOrderById);

router.param('orderId', listOrderById);

module.exports = router;