htAdmin.controller('DashboardController',function($state, requestService, isLogin){
	// console.log(tokenControlService.getAuthorizationToken());
	if(!isLogin) {
		$state.go('login');
		return false;
	}
	
	
});
