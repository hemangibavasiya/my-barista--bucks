
const { saveData} = require('../repository/commonRepo')
const { ratingBodyValidation } = require('../common/validation')
const status  = require('http-status')
const dbCon = require('../constants/dbCon')
const {errorGanerator} = require('../common/errorHandlar')


const giveRatings = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { error } = ratingBodyValidation(body)
            if (error) return reject(errorGanerator(status.BAD_REQUEST, error.details[0].message))

            const ratingDetails = generateRatingBody(body)
            const savedratings = await saveData(ratingDetails, dbCon.COLLECTION_RATINGS)
            return resolve(savedratings)

        } catch (error) {
            return reject(err)
        }
    })
}

function generateRatingBody(body) {
    const data = {}
    data[dbCon.FIELD_ORDER_ID] = body.order_id
    data[dbCon.FIELD_RATING] = body.rating
    return data
}
module.exports = {
    giveRatings
}