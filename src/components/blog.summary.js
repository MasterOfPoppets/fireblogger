var h = require('virtual-dom/h'),
	marked = require('marked')

module.exports = function render(post) {
	return h('article.blog-entry', { id: post.url }, [
		h('h2.blog-entry-title', [
			h('a', { href: '#' + post.url }, post.title)
		]),
		h('div.markdown', { innerHTML: marked(post.stub) })
	])
}