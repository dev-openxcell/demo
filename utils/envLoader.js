require('dotenv').config({ path: require('node:path').resolve(__dirname, '../.env') })

const ENV = { ...process.env }

module.exports = { ENV }