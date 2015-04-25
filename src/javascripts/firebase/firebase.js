(function () {
	'use strict'

	angular.module('fireblogger.firebase', [])

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
})()