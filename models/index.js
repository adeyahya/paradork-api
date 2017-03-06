const fs = require('fs')
const path = require('path')
const _ = require('lodash')

let files = fs.readdirSync(path.resolve('models'))
files = _.remove(files, (n) => {
	return ['index.js'].indexOf(n) < 0
})

files.map((file) => {
	exports[file.toString().replace('.js','')] = require(path.join(__dirname, file))
})