const mongoose = require('mongoose')
const { v4:uuidv4 } = require('uuid')

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    pdf:{
        data: Buffer,
        contentType: String
    },
    uuid: {
        type: String,
        default: uuidv4()
    },
    status: {
        type: String,
        default: 'In-progress'
    }
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)