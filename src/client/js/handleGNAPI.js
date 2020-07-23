const getGNData = async (city) => {
    let geoURL = 'http://api.geonames.org/searchJSON?name=';
    const username = '&maxRows=1&username=e19101990';
    const response = await fetch(geoURL + city + username)
    try {
        // create variable to store API response
        const data = await response.json();
        console.log(data);
        const lat = data.geonames[0].lat
        const lng = data.geonames[0].lng
        const country = data.geonames[0].countryName
        const name = data.geonames[0].name
        const geoArray = [lat, lng, country, name]
        console.log('geoArray:', geoArray)
        return geoArray;
    } catch (error) {
        console.log(error);
    }
}

export {getGNData}