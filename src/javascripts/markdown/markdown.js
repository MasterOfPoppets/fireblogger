(function () {
	'use strict'

	angular.module('fireblogger.markdown', [])

		.directive('markdown', function () {
			return {
				restrict: 'E',
				scope: {
					markdownContent: "="
				},
				link: function ($scope, element) {
					function setMarkdownText() {
						var parsedMarkdown
						if ($scope.markdownContent) {
							parsedMarkdown = marked($scope.markdownContent)
						} else {
							parsedMarkdown = marked(element.html())
						}
						element.html(parsedMarkdown)
					}

					setMarkdownText()

					$scope.$watch('markdownContent', function () {
						setMarkdownText()
					})
				}
			}
		})
})()