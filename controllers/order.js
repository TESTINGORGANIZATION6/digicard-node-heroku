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