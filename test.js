let request = require('supertest')
let app = require('./app')

describe('Requests to the root path', function() {
	it('Returns a 200 status code', function(done) {
		request(app)
			.get('/')
			.expect(200, done)
	})
})

describe('Request to user api', function() {
	let data = {
		firstname: "ade",
		lastname: "yahya",
		username: "adeyahya"
	}

	it('Returns a 200 status code', (done) => {
		request(app)
			.post('/api/user')
			.send(data)
			.expect(200)
			.expect(/firstname/i, done)
	})

	it('Returns json format', (done) => {
		request(app)
			.get('/api/user')
			.expect('Content-Type', /json/, done)
	})

	it('Returns valid data', (done) => {
		request(app)
			.get('/api/user')
			.expect(/adeyahya/i, done)
	})
})