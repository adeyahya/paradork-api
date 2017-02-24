let express = require('express')
let exphbs = require('express-handlebars')
let subdomain = require('express-subdomain')
let app = express()
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')

// connect mongodb
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/paradork')
app.set('superSecret', 'thedarkzone')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.set('models', require('./models'))

app.get('/', function(req, res) {
	res.render('home')
})
require( './router' )( app )

module.exports = app