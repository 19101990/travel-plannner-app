export function handleSubmit(event) {
    event.preventDefault()
    // get the destination from user
    let city = document.getElementById('input-city').value
    if (city != 0) {
        Client.getGNData(city)
            .then(async function (geoArray){
                return await postData('http://localhost:8000/geonames-api', {
                    latitude: geoArray[0],
                    longitude: geoArray[1],
                    country: geoArray[2]
                })
            })
            // .then(function (res){
            //     const lat = res[0].latitude
            //     const long = res[0].longitude
            //     return {lat, long}
            // })
    } else {
        alert('Enter valid city')
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