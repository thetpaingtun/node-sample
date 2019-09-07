const request = require('request')

function forecast(lat, lon, cb) {

      const url = `https://api.darksky.net/forecast/6c25e1b47a742c06918ef7c1334df9d8/${lat},${lon}?units=si`

      request({ url, json: true }, function (error, response) {

            if (error) {
                  cb(error)
            } else if (response.body.error) {
                  cb(response.body.error)
            } else {
                  const { temperature, precipProbability } = response.body.currently

                  const todaySummary = response.body.daily.data[0].summary

                  const info = `${todaySummary} It is currently ${temperature} degrees out.There is ${precipProbability * 100}% chance of raining`

                  cb(null,info)
            }
      });
}


module.exports = forecast