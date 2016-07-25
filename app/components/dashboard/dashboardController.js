htAdmin.controller('DashboardController',function($state, requestService, accountService, isLogin){
	if(!isLogin) {
		$state.go('login');
		return false;
	}

	this.userData = accountService.getInfo();
	this.listMenu = SIDEBAR_MENU;


});
