module.exports = function( app ) {
	let express = require('express')
	let router = express.Router()
	let Article = app.get('models').Article
	let User = app.get('models').User

	router.route('/articles', function(req, res, next) {
		next()
	})
	// Create new article
	.post(function(req, res, next) {
		User.findOne({ username: req.body._creator }, function(err, user) {
			if (err)
				throw err

			req.body._creator = user._id
			req.body.slug = req.body.title.replace(/ /g, '-')

			const newArticle = new Article(req.body)

			newArticle.save(function(err, article) {
				if (err) {
					throw err
				}

				user.articles.push(article._id)
				user.save()
				
				return res.json(article)
			})
			
		})
	})

	router.route('/articles/:slug')
	.get(function(req, res, next) {
		Article.findOne({ slug: req.params.slug })
			.populate('_creator')
			.exec(function(err, article) {
				if (err) throw err

				res.json(article)
			})
	})

	app.use('/', router)
}