htAdmin.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'components/home/homeView.html',
		controller: 'HomeController',
		controllerAs: 'hc'
	}).state('login', {
		url: '/login',
		templateUrl: 'components/login/loginView.html',
		controller: 'LoginController',
		controllerAs: 'lc'
	})
});
