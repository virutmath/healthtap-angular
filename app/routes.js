htAdmin.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider.state('dashboard', {
		url: '/',
		templateUrl: 'components/dashboard/dashboardView.html',
		controller: 'DashboardController',
		controllerAs: 'dc',
		resolve: {
			isLogin: (accountService) => {
				return accountService.checkLogin();
			}
		}
	}).state('login', {
		url: '/login',
		templateUrl: 'components/login/loginView.html',
		controller: 'LoginController',
		controllerAs: 'lc'
	})
});
