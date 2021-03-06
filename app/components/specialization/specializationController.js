htAdmin.controller('SpecializationController', function ($state, $stateParams, requestService, accountService,
                                                         profileService, alertService, languageService, isLogin) {
	//check login, check permission
	if (!isLogin) {
		$state.go('login');
		return false;
	}

	let self = this;
	self.listRecord = [];
	self.errors = [];


	self.translations = {};


	//new record object
	self.newRecord = {
		name: null,
		description: null,
	};

	//edit record object
	self.editRecord = {
		id: null,

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
		//get list record
		_getListRecord(null, function (err, result) {
			self.listRecord = result.data;
		})
	};

	this.showEditModal = (record) => {
		$('#editRecordModal').modal();
		requestService.apiRequest('get', API.URL.specialization(record.id), null, function (err, response) {
			self.editRecord = response.data.data;
		})
	};

	this.saveEditRecord = () => {
		//save change
		if (!self.editRecord) {
			return false;
		}
		let params = {
			name: self.editRecord.name,
			description: self.editRecord.description
		};
		requestService.formDataRequest('put',API.URL.specialization(self.editRecord.id), params, (err, response)=> {
			// console.log(response);
			alertService.alert('Cập nhật thành công');
			$('#editRecordModal').modal('hide');
		})
	};

	this.deleteRecord = (record) => {
		//check permission
		if (!accountService.checkPermission('delete')) {
			alertService.alert(self.translations.not_allow_delete);
			return false;
		}
		alertService.confirm('Bạn có muốn xóa người dùng này?', ()=> {
			//remove bản ghi khỏi listUser
			removeElement(self.listRecord, record);
			requestService.apiRequest('delete', API.URL.specialization(record.id), null, function (err, response) {
				alertService.alert('Thành công');
			})
		})
	};

	this.addRecord = () => {
		//check permission
		if (!accountService.checkPermission('add')) {
			alertService.alert(self.translations.not_allow_delete);
			return false;
		}
		self.errors = [];
		let params = {
			name: self.newRecord.name,
			description: self.newRecord.description
		};
		alertService.confirm('Bạn muốn thêm mới bản ghi?', ()=>{
			requestService.apiRequest('post', API.URL.specialization(), params, function (err, response) {
				// console.log(response);
				//thành công => update table
				self.listRecord.push(response.data.data);
				//clear input
				resetObject(self.newRecord);
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
		});
	};


	//private method
	function _getListRecord(filterDTO, callback) {
		if (!callback) throw new Error("this function require callback");
		//TODO parse filterDTO
		requestService.apiRequest('get', API.URL.specialization(), null, callback)
	}

	this.init();
});
