(function () {
	'use strict'

	angular
		.module('fireblogger')
		.directive('tabableInput', tabableInput)

	function tabableInput() {
		return {
			restrict: 'A',
			link: link
		}

		function link ($scope, element) {
			element.on('keydown', function (event) {
				if (event.which == 9) {
					element.val(element.val() + '\t')
					event.preventDefault()
					event.stopPropagation()
				}
			})

			element.scope().$on('$destroy', function () {
				element.off('keydown')
			})
		}
	}
})()