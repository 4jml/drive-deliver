driveDeliver.factory('AuthService', function ($rootScope, $http, SessionService, AUTH_EVENTS, Restangular) {
	return {
		login: function (credentials) {
			return Restangular
			.all('auth')
			.customPOST(credentials, null, null, { radian_app : 'radian_drivemanager'})
			.then(
				function (res) {
					SessionService.create(res.id, res.username, res.role);
					$rootScope.$broadcast(AUTH_EVENTS.loginAttempt);
				},
				function (res) {
					SessionService.create(null, null, null);
					$rootScope.$broadcast(AUTH_EVENTS.loginAttempt);
				}
			);

			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		},
		isAuthenticated: function () {
			return !!SessionService.id;
		},
		isAuthorized: function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (this.isAuthenticated() &&
				authorizedRoles.indexOf(SessionService.role) !== -1);
		}
	};
});