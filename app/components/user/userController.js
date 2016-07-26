htAdmin.controller('UserController', function ($state, $stateParams, requestService, accountService,
                                               profileService, alertService, languageService, isLogin) {
	//check login, check permission
	if (!isLogin) {
		$state.go('login');
		return false;
	}

	let self = this;
	self.listUser = [];
	self.errors = [];


	self.translations = {};


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
		//get translate content
		languageService.getTranslateStatic([
			'ALERT.PERMISSION.NOT_PERMISSION_DELETE'
			, 'ALERT.PERMISSION.NOT_PERMISSION_EDIT'
			, 'ALERT.PERMISSION.NOT_PERMISSION_ADD'
		], (result)=> {
			self.translations.not_allow_delete = result['ALERT.PERMISSION.NOT_PERMISSION_DELETE'];
			self.translations.not_allow_edit = result['ALERT.PERMISSION.NOT_PERMISSION_EDIT'];
			self.translations.not_allow_add = result['ALERT.PERMISSION.NOT_PERMISSION_ADD'];
		});
		//get list user
		_getListUser(null, function (err, result) {
			self.listUser = result.data;
			self.listUser.map((user)=> {
				user.avatar = profileService.getAvatarUrl(user.avatar_url);
				return user;
			});
			// console.log(result.data);
		})
	};

	this.showCreateUserArea = () => {

	};

	this.showEditModal = (user) => {
		//check permission
		if (!accountService.checkPermission('edit')) {
			alertService.alert(self.translations.not_allow_add);
			return false;
		}
		$('#editUserModal').modal();
		requestService.apiRequest('get', API.URL.user_detail(user.id), null, function (err, response) {
			let userData = response.data.data;
			self.editUser.id = userData.id;
			self.editUser.full_name = userData.full_name;
			self.editUser.avatar_url = userData.avatar_url;
		})
	};

	this.saveEditUser = () => {
		//check permission
		if (!accountService.checkPermission('edit')) {
			alertService.alert(self.translations.not_allow_add);
			return false;
		}
		//save change
		if (!self.editUser) {
			return false;
		}
		let params = {};
		if (self.editUser.full_name) {
			params.full_name = self.editUser.full_name;
		}
		if (self.editUser.password) {
			params.password = self.editUser.password;
		}
		if (self.editUser.avatar_url) {
			params.avatar_url = self.editUser.avatar_url;
		}
		requestService.formDataRequest('post',API.URL.user_detail(self.editUser.id), params, (err, response)=> {
			console.log(response);
		})
	};

	this.deleteUser = (user) => {
		//check permission
		if (!accountService.checkPermission('delete')) {
			alertService.alert(self.translations.not_allow_delete);
			return false;
		}
		alertService.confirm('Bạn có muốn xóa người dùng này?',()=>{
			//remove bản ghi khỏi listUser
			removeElement(self.listUser,user);
			requestService.apiRequest('delete',API.URL.user_detail(user.id),null,function(err,response){
				alertService.alert('Thành công');
			})
		})
	};

	this.addUser = () => {
		//check permission
		if (!accountService.checkPermission('add')) {
			alertService.alert(self.translations.not_allow_add);
			return false;
		}
		self.errors = [];
		let params = {
			email: this.newUser.email,
			password: this.newUser.password,
			role_code: [this.newUser.role_code]
		};
		requestService.apiRequest('post', API.URL.user_register(), params, function (err, response) {
			// console.log(response);
			//thành công => update table
			self.listUser.push(response.data.data);
			resetObject(self.newUser);
		}, function (err) {
			// console.log(err);
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
