describe('directives', function () {
	describe('markdown', function () {
		var element, $scope, $compile

		beforeEach(function () {
			module('fireblogger.markdown')

			inject(function ($rootScope, _$compile_) {
				$scope = $rootScope.$new()
				$compile = _$compile_
			})
		})

		it('should parse markdown supplied inside the element', function () {
			element = $compile(angular.element('<markdown># Hello</markdown>'))($scope)
			$scope.$digest()

			element.html().should.equal('<h1 id="hello">Hello</h1>\n')
		})

		it('should parse markdown supplied via scope attribute', function () {
			$scope.mdContent = '# Hello'
			element = $compile(angular.element('<markdown markdown-content="mdContent"></markdown>'))($scope)
			$scope.$digest()

			element.html().should.equal('<h1 id="hello">Hello</h1>\n')
		})
	})
})