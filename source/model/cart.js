const mongoose = require('mongoose')
const dbCon = require('../constants/dbCon')

cartSchema = new mongoose.Schema ({
    user_code: {
        type: Number,
        required: true
    },
    order_info: [{
        product_id: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    created_on: {
        type: Date,
        default: Date.now()
    }
})


cartSchema.plugin(global.db.autoIncrement.plugin, {
    model: dbCon.COLLECTION_CART,
    field: 'id',
    startAt: 1
})
module.exports = global.db.connection.model(dbCon.COLLECTION_CART, cartSchema)