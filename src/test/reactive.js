var Bealach = require('../bealach/bealach'),
	_ = Bealach._,
	h = require('virtual-dom/h'),
	marked = require('marked'),
	blogPost = require('../components/blog.post'),
	blogSummary = require('../components/blog.summary')

var fb = new Firebase('https://fiery-heat-3490.firebaseio.com/').child('blogEntries')

function renderAllPosts(stream) {
	return stream
		.map(blogSummary)
		.collect()
		.map(function (allPosts) {
			return h('div', allPosts)
		})
}

var myExports = {
	newPage: function (hash) {
		_('value', fb.child(hash))
			.map(function (snapshot) {
				return snapshot.val()
			})
			.map(blogPost)
			.each(Bealach.updateDom)
	},

	test: function () {
		_('child_added', fb)
			.map(function (snapshot) {
				return snapshot.val()
			})
			.reduce([], function (acc, curr) {
				acc.unshift(curr)

				_(acc)
					.through(renderAllPosts)
					.each(Bealach.updateDom)

				return acc
			})
			.done()
	}
}

module.exports = myExports