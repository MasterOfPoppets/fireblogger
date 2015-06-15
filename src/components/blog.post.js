var h = require('virtual-dom/h'),
	marked = require('marked')

module.exports = function render(post) {
	return h('article.blog-entry', [
		h('h1.blog-entry-title', post.title),
		h('span.blog-entry-date', post.date),
		h('div.markdown', { innerHTML: marked(post.post) })
	])
}