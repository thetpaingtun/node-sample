const https = require('https')



const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/myawaddy.json?access_token=pk.eyJ1IjoidGhldHBhaW5ndHVuIiwiYSI6ImNrMDN3OXprODJkYm4zY2tpNG9lYnIyN3EifQ.4RKXl0J0DBPcnWiWOuek6g&limit=1`


const request = https.request(mapBoxUrl, (response) => {

      let data = ''
      response.on('data', (chunk) => {
            data += chunk.toString()
      })

      response.on('end', () => {
            console.log(data)
      })
})

request.end()