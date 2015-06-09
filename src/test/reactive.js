var _ = require('highland'),
	h = require('virtual-dom/h'),
	createElement = require('virtual-dom/create-element'),
	events = require('dom-event-stream'),
	diff = require('virtual-dom/diff'),
	patch = require('virtual-dom/patch')

var fb = new Firebase('https://fiery-heat-3490.firebaseio.com/').child('blogEntries')
var tree = h('div')
var rootNode = createElement(tree)

function renderPostSummary(post) {
	return h('article.blog-entry', { id: post.url }, [
		h('h2.blog-entry-title', [
			h('a', { href: '#' + post.url }, post.title)
		]),
		h('div.markdown', { innerHTML: marked(post.stub) })
	])
}

function renderPost(post) {
	return h('article.blog-entry', [
		h('h1.blog-entry-title', post.title),
		h('span.blog-entry-date', post.date),
		h('div.markdown', { innerHTML: marked(post.post) })
	])
}

function renderAllPosts(stream) {
	return stream
		.map(renderPostSummary)
		.collect()
		.map(function (allPosts) {
			return h('div', allPosts)
		})
}

function routing() {
	var hashChanges = _(events(window, 'hashchange'))
		.map(function () {
			return window.location.hash
		})
		.map(function (hash) {
			return hash.substr(1, hash.length)
		})

	var aHashChange = hashChanges
		.fork()

	var bHashChange = hashChanges
		.fork()

	aHashChange
		.filter(function (hash) {
			return hash
		})
		.each(newPage)

	bHashChange
		.reject(function (hash) {
			return hash
		})
		.each(test)
}

function newPage(hash) {
	fb.child(hash).once('value', function (snapshot) {
		var newTree = renderPost(snapshot.val())
		var patches = diff(tree, newTree)
		rootNode = patch(rootNode, patches)
		tree = newTree
	})
}

function test() {
	document.body.appendChild(rootNode)

	_('child_added', fb)
		.map(function (snapshot) {
			return snapshot.val()
		})
		.reduce([], function (acc, curr) {
			acc.unshift(curr)

			_(acc)
				.through(renderAllPosts)
				.each(function (newTree) {
					var patches = diff(tree, newTree)
					rootNode = patch(rootNode, patches)
					tree = newTree
				})

			return acc
		})
		.done()
}

routing()
test()