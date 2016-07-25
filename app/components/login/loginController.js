htAdmin.controller('LoginController', function ($state, requestService, tokenControlService, accountService, alertService) {
	this.login = ()=> {
		let self = this;
		if (!(self.email || self.password)) {
			alertService.alert('Email và mật khẩu không được để trống');
			return false;
		}
		//login action
		async.waterfall([
			function(next) {
				requestService.apiGetToken(self.email, self.password, function (err, tokenData) {
					if (err) {
						next(err);
						return false;
					} else {
						//save token to cookie
						tokenControlService.setToken(tokenData);
						return next(null);
					}
				});
			},
			function(next) {
				//get info of user
				requestService.getUserInfo(function(err,userData) {
					if(err) {
						next(err);
						return false;
					}
					accountService.setUserInfo(userData);
					next(null,userData);
				});
			}
		], function(err,userData) {
			if(err) {
				$state.go('error500');
				return false;
			}
			// console.log(userData);
			//login success => check permission of token
			if (accountService.checkPermission()) {
				$state.go('dashboard');
			}
		});
	}

});
