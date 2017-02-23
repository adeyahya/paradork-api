let express = require('express')
let app = express()
let bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('models', require('./models'))

require( './router' )( app )

module.exports = app