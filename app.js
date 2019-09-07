const request = require('request')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')










geocode('myawaddy', (err, {latitude,longitude,name:location}) => {
      if (err) {
            console.log(err)
      } else {
            forecast(latitude, longitude, (err, info) => {
                  if (err) {
                        console.log(err)
                  } else {
                        console.log(location)
                        console.log(info)
                  }

            })
      }
})




