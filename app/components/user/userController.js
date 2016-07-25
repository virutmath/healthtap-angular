htAdmin.controller('UserController', function ($state, $stateParams, requestService, alertService, isLogin) {
	//check login, check permission
	if (!isLogin) {
		$state.go('login');
		return false;
	}

	let self = this;
	self.tableHeader = ['ID', 'Email'];
	self.listUser = [];
	self.errors = [];

	//new user object
	self.newUser = {
		email: null,
		password: null,
		role_code: null
	};

	this.init = () => {
		//get list user
		_getListUser(null, function (err, result) {
			let table = new TableAdmin(result.data);
			table.column('id');
			table.column('email');
			self.listUser = table.renderTableData();
		})
	};

	this.showCreateUserArea = () => {

	};

	this.addUser = () => {
		self.errors = [];
		let params = {
			email: this.newUser.email,
			password: this.newUser.password,
			role_code:[this.newUser.role_code]
		};
		requestService.apiRequest('post',API.URL.user_register(),params,function(err,response){
			console.log(response);
		},function(err) {
			console.log(err);
			for(var field in err.data.errors) {
				var fErrs = err.data.errors[field];
				fErrs.forEach((item)=>{
					self.errors.push(item);
				})
			}
			console.log(self.errors);
		});
	};


	//private method
	function _getListUser(filterDTO, callback) {
		if (!callback) throw new Error("this function require callback");
		//TODO parse filterDTO
		requestService.apiRequest('get', API.URL.user_list(), null, callback)
	}

	this.init();
});
