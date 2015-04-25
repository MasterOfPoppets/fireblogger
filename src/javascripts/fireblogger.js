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
})()