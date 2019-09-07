const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../util/geocode')
const forecast = require('../util/forecast')


const app = express()

//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup static directory
app.use(express.static(publicPath))

//setup handle bars
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
      res.render('index', {
            title: 'Weather App',
            name: 'me'
      })
})

app.get('/about', (req, res) => {
      res.render('about', {
            title: "About me",
            name: 'me'
      })
})

app.get('/help', (req, res) => {
      res.render('help', {
            title: 'Help',
            msg: 'This is a help messag',
            name: 'me'
      })
})

app.get('/weather', (req, res) => {

      const { address } = req.query

      if (address) {

            geocode(address, (err,loc) => {
                  if (err) {
                        return res.send({ error: err })
                  } else {
                        forecast(loc.latitude, loc.longitude, (err, info) => {
                              if (err) {
                                    return res.send({ error: err })
                              } else {
                                    return res.send(JSON.stringify({
                                          location:loc.name,
                                          address,
                                          info
                                    }))
                              }

                        })
                  }
            })

            return
      }

      res.send({ error: 'please provide an address' })


})

app.get('/products', (req, res) => {
      console.log(req.query)
      res.send(JSON.stringify({
            products: []
      }))
})

app.get('/help/*', (req, res) => {
      res.render('404', {
            title: '404',
            name: 'me',
            errMsg: 'No help article found!'
      })
})

app.get('*', (req, res) => {
      res.render('404', {
            title: '404',
            name: 'me',
            errMsg: 'page not found'
      })
})

app.listen(3000, () => {
      console.log('listening on port 3000')
})

