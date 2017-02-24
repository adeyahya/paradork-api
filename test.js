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
		firstname: "john",
		lastname: "doe",
		username: "johndoe",
		password: "selamat"
	}

	it('Returns a 200 status code', (done) => {
		request(app)
			.post('/user')
			.send(data)
			.expect(200)
			.expect(/firstname/i, done)
		// this.timeout(15000)
		// setTimeout(done, 1500)
	})

	it('Returns json format', (done) => {
		request(app)
			.get('/user')
			.expect('Content-Type', /json/, done)
	})

	it('Returns valid data', (done) => {
		request(app)
			.get('/user')
			.expect(/johndoe/i, done)
	})

	it('Return success status', function(done) {
		request(app)
			.delete('/user/johndoe')
			.expect(200, done)
		// this.timeout(15000)
		// setTimeout(done, 1500)
	})
})