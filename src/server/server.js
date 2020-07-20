const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json)
app.use(bodyParser.url-encoded({
    extended: true
}))

app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})