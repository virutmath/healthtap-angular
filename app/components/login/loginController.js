htAdmin.controller('LoginController', function (requestService, $cookies, alertService) {
	this.login = ()=> {
		if (!(this.email || this.password)) {
			alertService.alert('Email và mật khẩu không được để trống');
			return false;
		}
		requestService.apiGetToken(this.email, this.password, function(err) {
			if(err) {
				console.log(err);
			}
		});
	}


});
