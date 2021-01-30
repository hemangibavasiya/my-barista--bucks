const { placeOrderValidation } = require('../common/validation'),
_ = require('lodash')
const dbCon = require('../constants/dbCon')
const {errorGanerator} = require('../common/errorHandlar')
const { saveData, getData} = require('../repository/commonRepo')
const status  = require('http-status')


const placeOrder = (userCode, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { error } = placeOrderValidation(body)
            if (error) return reject(errorGanerator(status.BAD_REQUEST, error.details[0].message))
            const orderDetails = generateOrderBody(userCode, body)
            const inVoiceDetails = await saveData(orderDetails, dbCon.COLLECTION_ORDER)
            return resolve(inVoiceDetails)
        } catch (error) {
            return reject(error)
        }
    })
}

function generateOrderBody(userCode, body) {
    const data = {}
    data[dbCon.FIELD_USER_ID] = userCode
    data[dbCon.FIELD_ORDER_INFO] = body.order_info
    const price = []
    data[dbCon.FIELD_ORDER_INFO].forEach(element => {
        price.push(element.price * element.quantity)
    })
    const totalPrice = _.sum(price)
    data[dbCon.FIELD_TOTAL] = (body.promo) ?  totalPrice - (totalPrice * (body.promo / 100)) : totalPrice
    return data
}

const allOrders = (userCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrdersDetails = await getData({ user_id: userCode}, {_id: false}, dbCon.COLLECTION_ORDER)
            if(_.size(allOrdersDetails) === 0) return reject(errorGanerator(status.NO_CONTENT, comCon.MSG_NO_CONTENT))
            return resolve(allOrdersDetails)
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    placeOrder,
    allOrders
}