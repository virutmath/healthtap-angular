htAdmin.service('profileService', function() {
	this.getAvatarUrl = (avatarUrl = '') => {
		return avatarUrl ? avatarUrl : AVATAR_DEFAULT;
	}
});
