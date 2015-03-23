describe('factories', function () {
	describe('FirebaseFactory', function () {
		var FirebaseFactory;

		beforeEach(function () {
			module('fireblogger.firebase');

			inject(function (_FirebaseFactory_) {
				FirebaseFactory = _FirebaseFactory_;
			})
		})

		it('should be initialised with a model', function () {

		})
	})
})