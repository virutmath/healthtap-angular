htAdmin.component('sidebar',{
	templateUrl: 'shared/components/sidebar/sidebar.html',
	controller: function() {
		this.email = this.user.email;
	},
	controllerAs: 'com',
	bindings: {
		user : '=',
		menu: '='
	}
});
