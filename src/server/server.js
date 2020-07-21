var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// START EXPRESS APP
const app = express()

// SET PORT FOR THE APP
const port = 8080;

// STORE TRIPS ENTERED BY THE USER
let trips = []

// ALLOW CROSS-ORIGIN RESOURCE SHARING
app.use(cors())

// CONFIGURE MIDDLEWARE FOR DECODING BODY FROM HTTP REQUEST
// it grabs the HTTP body, decodes the information and appends it to req.body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('src/client'))

console.log(__dirname)


// CREATE ENDPOINT FOR HOME PAGE
// when user goes to the endpoint the index.html file will be rendered
// res.send('Hello world') > sends message to the endpoint
// res.sendFile('file_name') > sends file to the endpoint

app.get('/', function (req, res) {
    res.sendFile('/client/views/index.html', { root: __dirname + '/..' })
})
 
// CREATE ENDPOINT TO ADD A TRIP TO TRIPS ARRAY
app.post('/trip', (req, res) => {
    const trip = req.body
    // console.log the trip to avoid bugs
    console.log(trip)
    trips.push(trip)
    res.send('Your trip has been successfully added to the database')
})


app.listen(port, function () {
    console.log(`Travel Planner app listening on port ${port}!`)
})

// const dotenv = require('dotenv')
// dotenv.config()
// var path = require('path')
// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')

// const app = express()
// app.use(cors())
// app.use(bodyParser.json)
// app.use(bodyParser.urlencoded({
//     extended: true
// }))

// app.use(express.static('src/client'))

// console.log(__dirname)

// app.get('/', function (req, res) {
//     res.sendFile('/client/views/index.html', { root: __dirname + '/..' })
// })
// // app.use(express.static('dist'))
// // console.log(__dirname)

// // app.get('/', function (req, res) {
// //     res.sendFile(path.join(__dirname + '/../../dist/index.html'))
// // })

// app.listen(8080, function () {
//     console.log('Example app listening on port 8080!')
// })