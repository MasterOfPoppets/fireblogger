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
			FirebaseFactory.getPosts.should.be.empty;
		})

		it('should load all of the posts', function () {
			//sinon.stub(fb, 'on').yields({ 'post 1': {'title': 'test post 1'}, 'post 2': {'title': 'test post 2'} });
			FirebaseFactory.test();
			//sinon.callsArg(1);
			//FirebaseFactory.getPosts.length.should.equal(2);
		})
	})
})