console.log('client side js')


const weatherForm = document.querySelector('form')
const search = document.querySelector('form input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (event) => {
      event.preventDefault()


      message1.textContent = 'loading...'
      message2.textContent = ''

      const address = search.value
      fetchWeather(address)
})


function fetchWeather(address) {
      fetch(`/weather?address=${address}`)
            .then((response) => {
                  return response.json()
            }).then((data) => {
                  if (data.error) {
                        console.log(data.error)
                        message1.textContent = data.error
                        message2.textContent = ''
                  } else {
                        console.log(data.location)
                        console.log(data.info)
                        message1.textContent = data.info
                        message2.textContent = data.location
                        
                  }
            })
}

