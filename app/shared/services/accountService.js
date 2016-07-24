htAdmin.service('accountService', function ($cookies) {

	let userData = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;
	/**
	 * Check role
	 * @returns {boolean}
	 */
	this.checkPermission = ($role = '') => {
		return true;
	};

	this.setUserInfo = (user_info) => {
		$cookies.put('user',JSON.stringify(user_info));
	};


	this.checkLogin = () => {
		return !!userData;
	};

	this.getEmail = () => {
		return userData ? userData.email : null;
	}
});
