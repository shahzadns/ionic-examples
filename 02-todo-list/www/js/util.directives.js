(function () {
    'use strict';

    angular
        .module('util', [])
        .directive('autoFocus', AutoFocus);

    AutoFocus.$inject = ['$timeout'];

    function AutoFocus( $timeout ) {
        return {
            restrict: 'A',
            link: link
        };

        function link($scope, $element, $attrs) {
            var node = $element[0];

            if ($attrs.autofocus) {
                $scope.$watch($attrs.autofocus, focusIf);
            } else {
                focusIf(true);
            }

            function focusIf(condition) {
                if (condition) {
                $timeout(function() {
                    node.focus();
                }, $scope.$eval($attrs.autofocusDelay) || 0);
                }
            }
        }
    }
})();