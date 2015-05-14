(function () {
	'use strict'

	angular.module('fireblogger', ['fireblogger.firebase', 'fireblogger.markdown'])

		.directive('fireblogger', function ($timeout, FirebaseFactory) {
			return {
				restrict: 'E',
				scope: true,
				link: function ($scope) {
					$scope.model = {
						test: 'Hello world',
						fbModel: FirebaseFactory.fbModel
					}

					FirebaseFactory.loadAllPosts(function () {
						$scope.post = $scope.model.fbModel.posts[0].post
						console.log($scope.post)
					})
				}
			}
		})

		.directive('tabTextArea', function () {
			return {
				restrict: 'A',
				link: function ($scope, element) {
					element.on('keydown', function (event) {
						if (event.which == 9) {
							element.val(element.val() + '\t')
							event.preventDefault()
							event.stopPropagation()
						}
					})

					element.scope().$on('$destroy', function () {
						element.off('keydown')
					})
				}
			}
		})
})()