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
						model.posts.unshift(snapshot.val());
						console.log(model.posts);
					});
				}
			}
		}])
})()