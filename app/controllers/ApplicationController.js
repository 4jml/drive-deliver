driveDeliver.controller('ApplicationController', function ($rootScope, $scope, $location, $timeout, Restangular, AuthService, SessionService) {
	$scope.app = { user : SessionService };
	$scope.isAuthorized = AuthService.isAuthorized;
	$scope.isAuthenticated = AuthService.isAuthenticated;
	$scope.isLoaded = false;

	$scope.warningLines = [];
	$scope.step = 0;
	$scope.code = '';
	$scope.error = '';
	$scope.place = null;

	$scope.restart = function() {
		$scope.step = 0;
		$scope.warningLines = [];
		$scope.order = null;
		$scope.code = '';
		$scope.place = null;
	}

	$scope.numpad = function(number) {
		$scope.code = $scope.code + '' + number;
	}

	$scope.$watch('code', function (newValue, oldValue) {
		if ($scope.code.length == 4) {
			Restangular.one('drive/orders/bycode', $scope.code).get({ nesting : 1 }).then(function(order) {
				$scope.step = 1;
				$scope.order = order;
				$scope.error = '';

				angular.forEach($scope.order.lines, function(line, key) {
					if (line.quantity != line.availableQuantity)
						$scope.warningLines.push(line);
				});
			},
			function() {
				$scope.error = 'Votre code de retrait est invalide';
				$scope.code = '';
			});
		}
	});

	$scope.next = function() {
		$scope.warningLines = [];
	}
	$scope.cancel = function() {
		$scope.order.canceled = 1;
		Restangular.one('drive/orders', $scope.order.id).customPUT($scope.order, null).then(function() {
			$scope.restart();
		});
	}
	$scope.valid = function() {
		$scope.place = Math.floor(Math.random() * (15 - 0 + 1)) + 0;
		$scope.order.delivered = 1;
		Restangular.one('drive/orders', $scope.order.id).customPUT($scope.order, null);
		$timeout(function() {
			$scope.restart();
		}, 10000);
	}
});