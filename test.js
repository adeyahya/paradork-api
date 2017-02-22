let request = require('supertest')
let app = require('./app')

describe('Requests to the root path', function() {
	it('Returns a 404 status code', function(done) {
		request(app)
			.get('/')
			.expect(404)
			.end(function(err) {
				if(err) throw err
				done()
			})
	})
})