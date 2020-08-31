const emailHelper = require('../helpers/sendEmailHelper')
const Order = require('../models/Order')

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

/**
 * Import all orders from database
 * Check the status of order
 * Send email to the user and update the status
 */
exports.sendEmails = () => {
    Order.find()
        .select('-pdf')
        .exec((error, orders) => {
            if (error) {
                console.log('process failed')
            } else {
                orders.map(order => {
                    if (order.status !== "complete") {
                        const email = new emailHelper(order.email)
                        const flag = email.sendEmail()
                        if (flag === false) {
                            console.log("Mail Sent Failed")
                        } else {
                            console.log(`email sent to ${order.email}`)
                            Order.findByIdAndUpdate(
                                order._id,
                                { status: "complete" },
                                (err, updatedOrder) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                } 
                            )
                        }
                    }
                })
            }
        })
}
