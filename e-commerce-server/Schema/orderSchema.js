const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    orderedBy: {
        type: String,
        required: true
    },
    totalPrice: {
        type:Number,
        required: true
    },
    items:[{
        itemId: {
            type: String,
            required: true
        },
        itemPrice: {
            type: Number,
            required: true
        }
    }]
})

module.exports = mongoose.model('order',orderSchema)