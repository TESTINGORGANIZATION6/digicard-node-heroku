const emailHelper = require('../helpers/sendEmailHelper')

/**
 * pass the request body to send email function from helper class
 */
exports.sendEmail = (req, res) => {
    const email = new emailHelper(req.body.to)
    const flag = email.sendEmail()
    if (flag === false) {
        return res.status(400).json({
            error: 'error occurred' 
        })
    }
    return res.json({
        message: 'email sent'
    })
}
