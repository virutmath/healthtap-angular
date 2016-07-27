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
	}).state('dashboard.user',{
		url :'user',
		templateUrl: 'components/user/userListView.html',
		controller: 'UserController',
		controllerAs: 'sc',
		resolve: {
			isLogin: (accountService) => {
				return accountService.checkLogin();
			}
		}
	}).state('dashboard.question',{
		url: 'question',
		templateUrl: 'components/question/questionView.html',
		controller: 'QuestionController',
		controllerAs: 'sc',
		resolve: {
			isLogin: (accountService) => {
				return accountService.checkLogin();
			}
		}
	}).state('dashboard.specialization',{
		url: 'specialization',
		templateUrl: 'components/specialization/specializationView.html',
		controller: 'SpecializationController',
		controllerAs: 'sc',
		resolve: {
			isLogin: (accountService) => {
				return accountService.checkLogin();
			}
		}
	}).state('dashboard.topic',{
		url: 'topic',
		templateUrl: 'components/topic/topicView.html',
		controller: 'TopicController',
		controllerAs: 'sc',
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
