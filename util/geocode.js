const request = require('request')

function geocode(address, cb) {
      const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoidGhldHBhaW5ndHVuIiwiYSI6ImNrMDN3OXprODJkYm4zY2tpNG9lYnIyN3EifQ.4RKXl0J0DBPcnWiWOuek6g&limit=1`

      request({ url: mapBoxUrl, json: true }, (err, response) => {

            if (err) {
                  cb(err)
            } else if (response.body.features.length === 0) {
                  cb('unabled to find location')
            } else {
                  const location = response.body.features[0]
                  cb(null, {
                        name: location.place_name,
                        longitude: location.center[0],
                        latitude: location.center[1]
                  })
            }

      })
}


module.exports = geocode