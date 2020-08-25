const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// ENABLE FETCH ON THE SERVER SIDE
const fetch = require('node-fetch')
const { start } = require('repl')
const weather_key = process.env.weather_key
const pixabay_key = process.env.pixabay_key

// START EXPRESS APP
const app = express()

// SET PORT FOR THE APP
// const port = 8000;

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

// app.get('/', function (req, res) {
//     res.sendFile('dist/index.html')
// })
 

app.get('/test', (req, res) => {
    res.json({message: 'WORKS'})
})


// app.listen(port, function () {
//     console.log(`Travel Planner app listening on port ${port}!`)
// })

// CREATE ENDPOINT FOR GEONAMES
app.post('/geonames-api', function addGeoData(req, res) {
    tripData = {
        lat: req.body.url.latitude,
        long: req.body.url.longitude,
        country: req.body.url.country,
        name: req.body.url.name,
        days: '',
        date: '',
        trip_date: '',
        current_temp: '',
        trip_temp: '',
        current_description: '',
        trip_description: '',
        img: '',
        img_large: '',
        flag: ''
    }
    projectData.push(tripData);
    res.send(projectData);
})


app.get('/weatherbit-api', async (req, res) => {
    const lattitude = projectData[projectData.length-1].lat
    const longitude = projectData[projectData.length-1].long
    const day = projectData[projectData.length-1].days

    if (projectData[projectData.length-1].days === '') {
        const api_url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weather_key}&lat=${lattitude}&lon=${longitude}&days=1`
        const response = await fetch(api_url)
        const json = await response.json()
        res.json(json)
        console.log(projectData[projectData.length-1].days)
        projectData[projectData.length-1].current_temp = json.data[0].high_temp
        projectData[projectData.length-1].current_description = json.data[0].weather.description
    } else {
        const api_url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weather_key}&lat=${lattitude}&lon=${longitude}&days=${day}`
        const response = await fetch(api_url)
        const json = await response.json()
        res.json(json)
        console.log("blablabla", projectData[projectData.length-1].days)
        projectData[projectData.length-1].trip_temp = json.data[day-1].high_temp
        projectData[projectData.length-1].trip_description = json.data[day-1].weather.description
    } 
})

app.get('/pixabay-api', async (req, res) => {
    const name = projectData[projectData.length-1].name
    const api_url = `https://pixabay.com/api/?key=${pixabay_key}&q=${name}&category=places&image_type=photo`
    const response = await fetch(api_url)
    const json = await response.json()
    res.json(json)
    projectData[projectData.length-1].img = json.hits[0].webformatURL
    projectData[projectData.length-1].img_large = json.hits[1].largeImageURL
})

app.get('/rest-countries', async (req, res) => {
    const name = projectData[projectData.length-1].country
    const api_url = `https://restcountries.eu/rest/v2/name/${name}`
    const response = await fetch(api_url)
    const json = await response.json()
    res.json(json)
    console.log(json)
    projectData[projectData.length-1].flag = json[0].flag
    console.log(json[0].flag)
})

app.get('/data/:dates', async (req, res) => {
    const dates = req.params.dates.split(',')
    const startDate = dates[0]
    const todaysDate = dates[1]
    const daysLeft = dates[2]
    console.log(dates, startDate, todaysDate, daysLeft)
    projectData[projectData.length-1].days = daysLeft
    projectData[projectData.length-1].date = todaysDate
    projectData[projectData.length-1].trip_date = startDate
    const tripWeather = await fetch('http://localhost:8000/weatherbit-api')
    console.log(projectData)
    res.send(projectData)
})

module.exports = app