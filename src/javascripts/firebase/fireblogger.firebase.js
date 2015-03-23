(function () {
	'use strict';

	angular.module('fireblogger.firebase', [])

		.value('fb', new Firebase('https://fiery-heat-3490.firebaseio.com/'))

		.factory('FirebaseFactory', ['fb', function (fb) {
			var model = {
				posts: []
			}

			return {
				getPosts: model.posts,

				test: function (callback) {
					fb.child('blogEntries').on('value', callback);
				}
			}
		}])
})()