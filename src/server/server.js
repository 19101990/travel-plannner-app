var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// ENABLE FETCH ON THE SERVER SIDE
const fetch = require('node-fetch')
const weather_key = 'e4058fb963b541aca91727bfda55c7d9'

// START EXPRESS APP
const app = express()

// SET PORT FOR THE APP
const port = 8000;

// STORE TRIPS ENTERED BY THE USER
let projectData = []

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
    tripData = {
        lat: req.body.url.latitude,
        long: req.body.url.longitude,
        country: req.body.url.country,
        name: req.body.url.name,
        temp: '',
        description: ''
    }
    projectData.push(tripData);
    console.log('allData ', tripData.lat)
    console.log(projectData)
    res.send(projectData);
});

app.get('/weatherbit-api', async (req, res) => {
    const lattitude = projectData[0].lat
    const longitude = projectData[0].long
    const api_url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weather_key}&lat=${lattitude}&lon=${longitude}&days=1`
    const response = await fetch(api_url)
    const json = await response.json()
    res.json(json)
    console.log(json)
    projectData[0].temp = json.data[0].high_temp
    projectData[0].description = json.data[0].weather.description
    console.log(projectData[0])
} )


