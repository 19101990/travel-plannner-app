var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// START EXPRESS APP
const app = express()

// SET PORT FOR THE APP
const port = 8000;

// STORE TRIPS ENTERED BY THE USER
let trips = []

// ALLOW CROSS-ORIGIN RESOURCE SHARING
app.use(cors())

// CONFIGURE MIDDLEWARE FOR DECODING BODY FROM HTTP REQUEST
// it grabs the HTTP body, decodes the information and appends it to req.body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('dist'))

console.log(__dirname)


// CREATE ENDPOINT FOR HOME PAGE
// when user goes to the endpoint the index.html file will be rendered
// res.send('Hello world') > sends message to the endpoint
// res.sendFile('file_name') > sends file to the endpoint

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
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

// CREATE ENDPOINT FOR GEONAMES
app.post('/geonames-api', function addGeoData(req, res) {
    GNData = {
        lat: req.body.url.latitude,
        long: req.body.url.longitude,
        country: req.body.url.country
    }
    trips.push(GNData);
    console.log('gndata ', GNData.lat)
    // console.log(GNData.lat)
    console.log(trips)
    // console.log(trips[0])
    // console.log(trips[0].lat)
    // console.log(GNData.country)
    res.send(trips);
});


