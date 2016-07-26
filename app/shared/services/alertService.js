htAdmin.service('alertService', function () {
	this.alert = (/* String */ message = '') => {
		$.alert({
			theme: 'black',
			title: 'Thông báo',
			content: message,
		})
	};
	this.confirm = (/* String */ message = '',callback) => {
		if(!callback) throw new Error("this function require callback");
		$.confirm({
			theme:'black',
			title: 'Xác nhận',
			content: message,
			confirm: function () {
				callback();
			}
		})
	}
});
