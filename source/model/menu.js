const { string } = require('@hapi/joi')
const mongoose = require('mongoose')
const dbCon = require('../constants/dbCon')

menuSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},
{
    collection: 'menu'
})

menuSchema.plugin(global.db.autoIncrement.plugin, {
    model: dbCon.COLLECTION_MENU,
    field: 'id',
    startAt: 1
})
module.exports = global.db.connection.model(dbCon.COLLECTION_MENU, menuSchema)