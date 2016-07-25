htAdmin.controller('UserController', function ($state, $stateParams, requestService, profileService, alertService, isLogin) {
	//check login, check permission
	if (!isLogin) {
		$state.go('login');
		return false;
	}

	let self = this;
	self.listUser = [];
	self.errors = [];

	//new user object
	self.newUser = {
		email: null,
		password: null,
		role_code: null
	};

	//edit user object
	self.editUser = {
		id: null,
		full_name: null,
		password: null,
		avatar_url: null
	};



	this.init = () => {
		//get list user
		_getListUser(null, function (err, result) {
			// let table = new TableAdmin(result.data);
			// table.column('id','ID');
			// table.column('email','Email');
			// table.column('created_at','Ngày tạo');
			// table.column('updated_at','Ngày cập nhật');
			// table.column('activated','Kích hoạt');
			// self.listUser = table.renderTableData();
			self.listUser = result.data;
			self.listUser.map((user)=> {
				user.avatar = profileService.getAvatarUrl(user.avatar_url);
				return user;
			});
			console.log(result.data);
		})
	};

	this.showCreateUserArea = () => {

	};

	this.showEditModal = (user) => {
		$('#editUserModal').modal();
		requestService.apiRequest('get', API.URL.user_detail(user.id), null, function (err, response) {
			let userData = response.data.data;
			self.editUser.id = userData.id;
			self.editUser.full_name = userData.full_name;
			self.editUser.avatar_url = userData.avatar_url;
		})
	};

	this.saveEditUser = () => {
		//save change
		if(!self.editUser) {
			return false;
		}
		let params = {};
		if(self.editUser.full_name) {
			params.full_name = self.editUser.full_name;
		}
		if(self.editUser.password) {
			params.password = self.editUser.password;
		}
		if(self.editUser.avatar_url) {
			params.avatar_url = self.editUser.avatar_url;
		}
		requestService.formDataRequest(API.URL.user_detail(self.editUser.id),params,(err,response)=>{
			console.log(response);
		})
	};

	this.addUser = () => {
		self.errors = [];
		let params = {
			email: this.newUser.email,
			password: this.newUser.password,
			role_code: [this.newUser.role_code]
		};
		requestService.apiRequest('post', API.URL.user_register(), params, function (err, response) {
			// console.log(response);
			//thành công => update table

		}, function (err) {
			console.log(err);
			for (var field in err.data.errors) {
				var fErrs = err.data.errors[field];
				fErrs.forEach((item)=> {
					self.errors.push(item);
				})
			}
			// console.log(self.errors);
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
