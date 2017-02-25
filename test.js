let request = require('supertest')
let app = require('./app')
let xAccessToken = ""
let data = {
	firstname: "john",
	lastname: "doe",
	username: "johndoe",
	password: "selamat",
	email: "johndoe@paradork.com"
}

describe('Requests to the root path', function() {
	it('Returns a 200 status code', function(done) {
		request(app)
			.get('/')
			.expect(200, done)
	})
})

describe('Register new user', function() {
	it('Return a 200 status code', function(done) {
		request(app)
			.post('/register')
			.send(data)
			.expect(200, done)
	})
})

describe('Login new user', function() {
	it('Return success status code and return token', function(done) {
		request(app)
			.post('/auth')
			.send(data)
			.expect(200)
			.then((response) => {
				xAccessToken = response.body.token
				done()
			})
	})
})

describe('Authentication', function() {
	it('Returns 403 code when token not provided', function(done) {
		request(app)
			.get('/user')
			.expect(403, done)
	})

	it('Returns 200 ok when token provided', function(done) {
		request(app)
			.get('/user')
			.set('x-access-token', xAccessToken)
			.expect(200, done)
	})
})

describe('Show user', function() {
	it('Return success status code', function(done) {
		request(app)
			.delete('/user/johndoe')
			.set('x-access-token', xAccessToken)
			.expect(200, done)
	})
})