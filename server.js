const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

require('./db/mongoConnect')
app.use('/api', require('./modules/index'))

module.exports = { app }