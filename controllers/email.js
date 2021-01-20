const emailHelper = require('../helpers/sendEmailHelper')
const Order = require('../models/Order')

/**
 * pass the request body to send email function from helper class
 */
exports.sendEmail = async (req, res) => {
    const email = new emailHelper(req.body.to)
    const html = "Please download your PDF. Please visit us at <a href='https://www.hexovo.com'>hexovo</a>"
    const subject = 'Your PDF is ready'
    const flag = await email.sendEmail(subject, html)
    console.log(flag)
    if (flag === false) {
        const html = `Failed while sending email to ${req.body.to}`
        sendFailureEmail(html)
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
                const html = 'Unable to retrive orders from database'
                sendFailureEmail(html)
            } else {
                orders.map(async order => {
                    if (order.status !== "complete") {
                        const html = "Please download your PDF. Please visit us at <a href='https://www.hexovo.com'>hexovo</a>"
                        const subject = 'Your PDF is ready'
                        const email = new emailHelper(order.email)
                        const flag = await email.sendEmail(subject, html)
                        if (flag === false) {
                            console.log("Mail Sent Failed")
                            const html = `Failed while sending email to ${email}`
                            sendFailureEmail(html)
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

/**
 * Send failure email to owners
 */
const sendFailureEmail = exports.sendFailureEmail = async html => {
    const email = new emailHelper('hexovo6@gmail.com')
    const subject = 'Failure Notification'
    const flag = await email.sendEmail(subject, html)
    if (flag === false) {
        return res.status(400).json({
            error: 'error occurred' 
        })
    }
    return res.json({
        message: 'email sent to admin'
    })
}
