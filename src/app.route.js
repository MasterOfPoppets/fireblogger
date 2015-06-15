var _ = require('./bealach/bealach')._,
	events = require('dom-event-stream')

module.exports = function router() {
	return _(function (push, next) {
		var hashChanges = _(events(window, 'hashchange'))
			.map(function (hashEvent) {
				return hashEvent.target.location.hash
			})

		push(null, window.location.hash)
		next(hashChanges)
	}).map(function (hash) {
		return hash.replace('#', '')
	})
}