htAdmin.component('sidebar', {
	templateUrl: 'shared/components/sidebar/sidebar.html',
	controller: function () {
		if (this.user && this.user.email) {
			this.email = this.user.email;
		}
	},
	controllerAs: 'com',
	bindings: {
		user: '=',
		menu: '='
	}
});
