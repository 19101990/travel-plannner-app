var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())


app.use(express.static('src/client'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('/client/views/index.html', { root: __dirname + '/..' })
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
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