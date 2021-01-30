const router = require('express').Router()
const verify = require('./verifyToken')
const status  = require('http-status')
const comCon = require('../constants/comCon')
const { fetchData } = require('../services/menu')
const { placeOrder, allOrders } = require('../services/orderManage')
const { giveRatings } = require('../services/ratings')


router.get('/menu', verify, async (req, res) => {
    try {
        const userCode = req.headers[comCon.FIELD_USER_CODE]
        const response = await fetchData(userCode)
        res.status(status.OK).send(response)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})

router.post('/place/order', verify, async (req, res) => {
    try {
        const userCode = req.headers[comCon.FIELD_USER_CODE]
        const response = await placeOrder(userCode, req.body)
        res.status(status.OK).send(response)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})

router.post('/rating', verify, async (req, res) => {
    try {
        const response = await giveRatings(req.body)
        res.status(status.OK).send(response)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})

router.get('/all/orders', verify, async (req, res) => {
    try {
        const userCode = req.headers[comCon.FIELD_USER_CODE]
        const response = await allOrders(userCode)
        res.status(status.OK).send(response)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})

module.exports = router