let request = require('supertest')
let app = require('./app')

describe('Requests to the root path', function() {
	it('Returns a 404 status code', function(done) {
		request(app)
			.get('/')
			.expect(404, done)
	})
})

describe('Request to user api', function() {
	let data = {
		first_name: "ade",
		last_name: "yahya",
		username: "adeyahya"
	}

	it('Returns a 200 status code', (done) => {
		request(app)
			.post('/api/user')
			.send(data)
			.expect(200)
			.expect(/first_name/i, done)
	})

	it('Returns json format', (done) => {
		request(app)
			.post('/api/user')
			.send(data)
			.expect('Content-Type', /json/, done)
	})

	it('Returns valid data', (done) => {
		request(app)
			.post('/api/user')
			.send(data)
			.expect(/adeyahya/i, done)
	})
})