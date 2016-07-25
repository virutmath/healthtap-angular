htAdmin.component('avatar',{
	templateUrl: 'shared/components/avatar/avatar.html',
	controller: function() {
		this.avatarDefault = AVATAR_DEFAULT;
	},
	controllerAs: 'com',
	bindings: {
		avatarUrl: '='
	}
});
