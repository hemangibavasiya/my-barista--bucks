const express = require('express')
const dotenv = require('dotenv')


dotenv.config()

const dbCon = require('./repository/db')

global.db = dbCon.connect()
require('./model/modelExport')

const app = express()


app.listen(process.env.PORT, () => console.log('server is up now'))

const authRoute = require('./routes/auth')
const coffeeRoute = require('./routes/coffeeManage')
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/coffee', coffeeRoute)