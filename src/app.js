var router = require('./app.route'),
	reactive = require('./test/reactive'),
	Bealach = require('./bealach/bealach')

Bealach.applyToDom(function () {
	router().each(function (hash) {
		if (hash) {
			reactive.newPage(hash)
		} else {
			reactive.test()
		}
	})
})