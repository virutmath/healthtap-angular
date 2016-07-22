htAdmin.service('alertService', function () {
	this.alert = (/* String */ message = '') => {
		$.alert({
			theme: 'black',
			title: 'Thông báo',
			content: message,
		})
	}
});
