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
				},

				savePost: function (postObj) {
					fb.child(postObj.url).set(postObj)
				}
			}
		}])
		.directive('firebaseSave', ['FirebaseFactory', function (FirebaseFactory) {
			return {
				restrict: 'A',
				link: function ($scope) {
					$scope.save = function () {
						console.log('saving to firebase')
						FirebaseFactory.savePost($scope.model)
					}
				}
			}
		}])
		.directive('fireblogger', function ($timeout, FirebaseFactory) {
			return {
				restrict: 'E',
				link: function ($scope) {
					$scope.model = {
						test: 'Hello world',
						fbModel: FirebaseFactory.fbModel,
						url: 'test-url',
						stub: 'Stub'
					}

					FirebaseFactory.loadAllPosts(function () {
						$scope.post = $scope.model.fbModel.posts[0].post
						console.log($scope.post)
					})
				}
			}
		})
})()