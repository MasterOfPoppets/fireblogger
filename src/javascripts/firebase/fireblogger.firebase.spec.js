var snapshot = {
	posts: [
		{ 'post-1': {'title': 'test post 1'} },
		{ 'post-2': {'title': 'test post 2'} }
	],
	val: function () {
		return this.posts;
	}
}

describe('factories', function () {
	describe('FirebaseFactory', function () {
		var FirebaseFactory, fb;

		beforeEach(function () {
			module('fireblogger.firebase');

			inject(function (_FirebaseFactory_, _fb_) {
				FirebaseFactory = _FirebaseFactory_
				fb = _fb_;
			})
		})

		it('should be initialised with a model', function () {
			FirebaseFactory.fbModel.posts.should.be.empty;
		})

		it('should load all of the posts', function () {
			sinon.stub(fb, 'on').yields(snapshot);

			FirebaseFactory.loadAllPosts();

			FirebaseFactory.fbModel.posts.length.should.equal(2);
		})
	})
})