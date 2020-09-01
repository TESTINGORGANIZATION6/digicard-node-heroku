const fs = require('fs')
const formidable = require('formidable')
const Order = require('../models/Order')

/**
 Add order in mongodb
 */
exports.addOrder = (req, res) => {
    let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
        // validate the fields
        const {
            name,
            email
        } = fields

        if (!name ||
            !email) {
                return res.status(400).json({
                    error: "All fields are required"
                })
            }
        
        let order = new Order(fields)
        if (files.pdf) {
            order.pdf.data = fs.readFileSync(files.pdf.path)
            order.pdf.contentType = files.pdf.path
        }

        order.save((error, result) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            res.json(result)
        })
    })
}

/**
 * List all orders from database
 */

exports.listOrders = (req, res) => {
    Order.find()
        .select('-pdf')
        .exec((error, orders) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            return res.json(orders)
    })
}

 /**
  * List order by ID
  */

exports.listOrderById = (req, res, next, id) => {
    Order.findById(id)
        .exec((error, order) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            req.order = order
            next()
        })
}

/**
 * Get order by ID
 */

exports.getOrderById = (req, res) => {
    req.order.pdf = undefined
    return res.json(req.order)
}

/**
 * Delete orders where status is complete
 */

exports.deleteCompletedOrders = () => {
    console.log("Running cron for deletion")
    Order.find()
        .exec((error, orders) => {
            if (error) {
                console.log(error)
                // TO DO: Send notifications to owners when this is failed
            } else {
                orders.map(order => {
                    if (order.status === "complete") {
                        Order.findByIdAndDelete(order._id)
                            .exec(err => {
                                if (err) {
                                    console.log(err)
                                    // TO DO: Send notifications to owners when this is failed
                                } else {
                                    console.log(`${order.name} deleted`)
                                }
                            })
                    }
                })
            }
        })
}