const comCon = require('../constants/comCon'),
dbCon = require('../constants/dbCon')
const {errorGanerator} = require('../common/errorHandlar'),
status  = require('http-status')
const { getData } = require('../repository/commonRepo'),
_ = require('lodash')

const fetchData = (userCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderData = await getData({ user_id: userCode}, {_id: false, order_info: true}, dbCon.COLLECTION_ORDER)
            let recommendItemsDetails
            if(_.size(orderData) !== 0) {
                const recommendItems = []
                orderData.forEach(element => {
                    element['order_info'].forEach(item => {
                        recommendItems.push(item.menu_id)
                    })
                })
                recommendItemsDetails = await getData({id: { '$in': recommendItems }}, {_id:false}, dbCon.COLLECTION_MENU)
            }
            const response = await getData({}, {_id:false}, dbCon.COLLECTION_MENU)
            if(_.size(response) === 0) return reject(errorGanerator(status.NO_CONTENT, comCon.MSG_NO_CONTENT))
            
            const finalData = {}
            finalData['Recommend Items'] = (_.size(recommendItemsDetails) !== 0) ? recommendItemsDetails : []
            finalData['MenuItems'] = response
            return resolve(finalData)

        } catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    fetchData
}