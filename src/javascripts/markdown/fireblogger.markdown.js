(function () {
	'use strict'

	angular.module('fireblogger.markdown', [])

		.directive('markdown', function () {
			return {
				restrict: 'E',
				scope: {
					markdownContent: "="
				},
				link: function (scope, elem, attrs) {
					var parsedMarkdown;
					if (scope.markdownContent) {
						parsedMarkdown = marked(scope.markdownContent);
					} else {
						parsedMarkdown = marked(elem.html())
					}
					elem.html(parsedMarkdown)
				}
			}
		})
})()