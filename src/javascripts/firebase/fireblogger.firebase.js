(function () {
	'use strict';

	angular.module('fireblogger.firebase', [])

		.value('fb', new Firebase('https://fiery-heat-3490.firebaseio.com/').child('blogEntries'))

		.factory('FirebaseFactory', ['fb', function (fb) {
			var model = {
				posts: []
			}

			return {
				fbModel: model,

				loadAllPosts: function () {
					fb.on('value', function (snapshot){
						var posts = snapshot.val()
						for (var i = 0; i < posts.length; i++) {
							model.posts.unshift(posts[i])
						}
					});
				}
			}
		}])
})()