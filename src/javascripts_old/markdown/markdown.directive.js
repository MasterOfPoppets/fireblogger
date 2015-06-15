(function () {
	'use strict'

	angular
		.module('fireblogger')
		.directive('markdown', markdown)

	function markdown() {
		return {
			restrict: 'E',
			scope: {
				markdownContent: "="
			},
			link: link
		}

		function link($scope, element) {
			function setMarkdownText() {
				var parsedMarkdown
				if ($scope.markdownContent) {
					parsedMarkdown = marked($scope.markdownContent)
				} else {
					parsedMarkdown = marked(element.html())
				}
				element.html(parsedMarkdown)
			}

			$scope.$watch('markdownContent', function () {
				setMarkdownText()
			})
		}
	}
})()