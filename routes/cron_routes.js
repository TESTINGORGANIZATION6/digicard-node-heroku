const cron = require('node-cron')
const router = require('express').Router()
const { sendEmails } = require('../controllers/email')
const { deleteCompletedOrders } = require('../controllers/order')

// Schedule cron to send emails to the users
cron.schedule('*/30 * * * *', sendEmails);

// Scedule cron to delete completed orders
cron.schedule('*/30 * * * *', deleteCompletedOrders);

module.exports = router