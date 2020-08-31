const cron = require('node-cron')
const router = require('express').Router()
const { sendEmails } = require('../controllers/email')

cron.schedule('*/30 * * * *', sendEmails);

module.exports = router