describe('Markdown directive', function () {
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

		element[0].innerHTML.should.be.equal('<h1 id="hello">Hello</h1>\n')

		element = $compile(angular.element('<markdown># World</markdown>'))($scope)
		$scope.$digest()

		element[0].innerHTML.should.be.equal('<h1 id="world">World</h1>\n')
	})

	it('should parse markdown supplied via scope attribute', function () {
		$scope.mdContent = '# World'
		element = $compile(angular.element('<markdown markdown-content="mdContent"></markdown>'))($scope)
		$scope.$digest()

		element[0].innerHTML.should.be.equal('<h1 id="world">World</h1>\n')
	})
})