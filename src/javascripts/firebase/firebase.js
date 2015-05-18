(function () {
	'use strict'

	angular
		.module('fireblogger')
		.value('fb', new Firebase('https://fiery-heat-3490.firebaseio.com/').child('blogEntries'))
		.factory('FirebaseFactory', ['fb', '$timeout', function (fb, $timeout) {
			var model = {
				posts: []
			}

			return {
				fbModel: model,

				loadAllPosts: function (callback) {
					fb.on('child_added', function (snapshot){
						$timeout(function () {
							model.posts.unshift(snapshot.val())
							callback()
						})
					})
				}
			}
		}])
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