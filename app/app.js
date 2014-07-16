var driveDeliver = angular.module('driveDeliver' , [ 'ngRoute', 'restangular' ]);

driveDeliver.run(function($rootScope, AuthService, SessionService) {
	AuthService.login({ username : 'driveDeliver' , password : 'test' });
});

driveDeliver.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(API_URL);
	RestangularProvider.setDefaultHttpFields({
		'withCredentials': true
	});
});