import fetch from "node-fetch"

export function handleSubmit(event) {
    event.preventDefault()
    // get the destination from user
    let city = document.getElementById('input-city').value
    const startingDate = document.getElementById('input-start-date').value
    // console.log(startingDate)
    const timeDeparture = (new Date(startingDate).getTime()) / 1000;
    const timeNow = (new Date().getTime())/1000
    // console.log(timeDeparture)
    // console.log(timeNow)
    const daysLeft = Math.round((timeDeparture - timeNow) / 86400);
    console.log(daysLeft)
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
                await postData('http://localhost:8000/days-left', daysLeft)
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
    // try {
    //     const newData = await response.json()
    //     console.log("Console.log newData from postData", newData)
    //     return newData
    // } catch (error) {
    //     console.log(error)
    // }
}