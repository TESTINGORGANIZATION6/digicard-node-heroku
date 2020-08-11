const router = require('express').Router();

const { sendEmail } = require('../controllers/email');

router.post('/sendemail', sendEmail);

module.exports = router;