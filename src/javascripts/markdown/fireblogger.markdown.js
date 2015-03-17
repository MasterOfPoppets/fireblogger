(function () {
	'use strict'

	angular.module('fireblogger.markdown', [])

		.directive('markdown', function () {
			return {
				restrict: 'E',
				link: function (scope, elem, attrs) {
					console.log(attrs['markdownContent']);
					var parsedMarkdown = marked(elem.html())
					elem.html(parsedMarkdown)
				}
			}
		})
})()