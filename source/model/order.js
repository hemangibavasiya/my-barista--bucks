const mongoose = require('mongoose')
const dbCon = require('../constants/dbCon')

const orderSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    order_info: [{
        menu_id: {
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
}, {
    collection: dbCon.COLLECTION_ORDER
})


orderSchema.plugin(global.db.autoIncrement.plugin, {
    model: dbCon.COLLECTION_ORDER,
    field: 'id',
    startAt: 1
})

module.exports = global.db.connection.model(dbCon.COLLECTION_ORDER, orderSchema)