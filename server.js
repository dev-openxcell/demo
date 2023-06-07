const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./router/main.routes')

app.use(cors())
app.use(express.json())

require('./utils/connect.util')
app.use('/api', router)

module.exports = { app }