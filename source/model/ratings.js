const mongoose = require('mongoose')
const dbCon = require('../constants/dbCon')

const ratingSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    outOf: {
        type: Number,
        required: true,
        default: 5
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: dbCon.COLLECTION_RATINGS
})

ratingSchema.plugin(global.db.autoIncrement.plugin, {
    model: dbCon.COLLECTION_RATINGS,
    field: 'id',
    startAt: 1
})

module.exports = global.db.connection.model(dbCon.COLLECTION_RATINGS, ratingSchema)