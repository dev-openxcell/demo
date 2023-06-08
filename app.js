const { app } = require('./server')
const { ENV } = require('./utils/envLoader')

app.listen(ENV.PORT, (err, data) => {
    if(err) console.log('failed to initialize server', err.message)
    console.log('server running on', ENV.PORT)
})
