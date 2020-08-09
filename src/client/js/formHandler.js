import fetch from "node-fetch"

export function handleSubmit(event) {
    event.preventDefault()
    // get the destination from user
    let city = document.getElementById('input-city').value
    let startingDate = new Date(document.getElementById('input-start-date').value)
    let todaysDate = new Date()
    const daysLeft = Math.ceil((startingDate - todaysDate)/86400000)
    // .toIDOString() converts the date to ISO format
    // .split() gets the year, month and day of the date
    startingDate = startingDate.toISOString().split('T')[0]
    todaysDate = todaysDate.toISOString().split('T')[0]
    console.log(startingDate)
    console.log(todaysDate)
    console.log(daysLeft)
    // const timeDeparture = (new Date(startingDate).getTime()) / 1000;
    // const timeNow = (new Date().getTime())/1000
    // const daysLeft = Math.round((timeDeparture - timeNow) / 86400);
    // console.log(daysLeft)
    if (city != 0) {
        Client.getGNData(city)
            .then(async function (geoArray){
                return await postData('http://localhost:8000/geonames-api', {
                    latitude: geoArray[0],
                    longitude: geoArray[1],
                    country: geoArray[2],
                    name: geoArray[3]
                })
            })
            .then(async function (){
                await fetch('http://localhost:8000/weatherbit-api')
            })
            .then(async function (){
                await fetch('http://localhost:8000/pixabay-api')
            })
            .then(async function (){
                const api_url = `data/${startingDate},${todaysDate},${daysLeft}`
                const response = await fetch(api_url)
                const json = await response.json()
                console.log(json)
            })
    } else {
        alert('Enter valid data')
    }
} 


const postData = async (url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({url: data})
    })
}