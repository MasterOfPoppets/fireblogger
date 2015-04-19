var snapshot = {
	posts: [
		{ 'post-1': {'title': 'test post 1'} },
		{ 'post-2': {'title': 'test post 2'} }
	],
	val: function () {
		return this.posts
	}
}

describe('factories', function () {
	describe('FirebaseFactory', function () {
		var FirebaseFactory, fb, $timeout

		beforeEach(function () {
			module('fireblogger.firebase')

			inject(function (_FirebaseFactory_, _fb_, _$timeout_) {
				FirebaseFactory = _FirebaseFactory_
				fb = _fb_
				$timeout = _$timeout_
			})
		})

		it('should be initialised with a model', function () {
			FirebaseFactory.fbModel.posts.should.be.empty
		})

		it('should load all of the posts', function (done) {
			sinon.stub(fb, 'on').yields(snapshot)

			FirebaseFactory.loadAllPosts(function () {
				FirebaseFactory.fbModel.posts[0].length.should.equal(2)
				done()
			})

			$timeout.flush()
		})
	})
})