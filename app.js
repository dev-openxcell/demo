const express = require('express')
const cors = require('cors')
const app = express()
const { ENV } = require('./utils/envLoader')
const router = require('./router/main.routes')

app.use(cors())
app.use(express.json())

require('./utils/connect')
app.use('/api', router)

app.listen(ENV.PORT, (err, data) => {
    if(err) console.log('failed to initialize server', err.message)
    console.log('server running on', ENV.PORT)
})