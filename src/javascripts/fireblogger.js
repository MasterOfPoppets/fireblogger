(function () {
	'use strict'

	angular.module('fireblogger', ['fireblogger.firebase'])

		.controller('FirebloggerCtrl', function ($scope, $timeout, FirebaseFactory) {
			$scope.model = {
				test: 'Hello world',
				fbModel: FirebaseFactory.fbModel
			};

			FirebaseFactory.loadAllPosts();
			//FirebaseFactory.test(function (snapshot) {
			//	$timeout(function () {
			//		console.log(snapshot.val()['new-professional-site']);
			//		$scope.model.test = 'Bollox';
			//		$scope.model.test = snapshot.val()['new-professional-site'];
			//	})
			//});
		})
})()