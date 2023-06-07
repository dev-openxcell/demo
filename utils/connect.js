const mongoose = require('mongoose')
const { ENV } = require('../utils/envLoader')

const connectionString = `mongodb://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_SERVER}:${ENV.DB_PORT}/${ENV.DB_NAME}`

let connect = async () => {
    try {
        await mongoose.connect(`mongodb://${ENV.DB_SERVER}:${ENV.DB_PORT}/${ENV.DB_NAME}`)
        // await mongoose.connect(connectionString)

        console.log('DB connected')
    }
    catch(err){
        console.log('Failed to connect', err.message)
    }
}

connect()