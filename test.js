var Transform = require('stream').Transform,
	util = require('util')

var TestStream = function(options) {
	options = options || {}
	options.objectMode = true
	Transform.call(this, options)
}
util.inherits(TestStream, Transform)

TestStream.prototype._transform = function (chunk, encoding, callback) {
	console.log(chunk)
	this.push(chunk)
	callback()
}

module.exports = TestStream