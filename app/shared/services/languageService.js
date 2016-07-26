htAdmin.service('languageService',function($translate){
	this.getTranslateStatic = (list = [], callback) => {
		if(!callback) throw new Error("this function is required callback");
		$translate(list).then(callback)
	}
});
