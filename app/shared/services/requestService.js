htAdmin.service('requestService', function ($http, $cookies, tokenControlService) {

	this.apiGetToken = (username, password, callback) => {
		if (!callback) throw new Error("This function require callback");
		$http({
			method: 'POST',
			url: API.URL.token(),
			data: {
				grant_type: 'password',
				username,
				password,
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET
			}
		}).then((response)=> {
			callback(null,response.data.data);
			return true;
		}, (error)=> {
			callback(error);
			return false;
		})
	};
	this.refreshToken = (successCb, failureCb) => {
		$http({
			method: 'POST',
			url: API.URL.token(),
			data: {
				grant_type: 'refresh_token',
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				refresh_token: tokenControlService.getTokenRefresh()
			}
		}).then((response)=> {
			if (successCb) successCb(null, response);
		}, (response)=> {
			if (failureCb) failureCb(response);
		})
	};

	this.apiRequest = (method = 'get', url, params, successCb, failureCb) => {
		var self = this;
		$http({
			method: method,
			url: url,
			data: params,
			headers: {'Authorization': tokenControlService.getAuthorizationToken()}
		}).then((response)=> {
			// console.log(response);
			if (successCb) successCb(null, response);
		}, (response)=> {
			//xu ly request bi het han token
			if(response.data.errors.code == ERROR_NAME.TOKEN_EXPIRED) {
				//refresh token
				self.refreshToken((err, tokenRefreshed) =>{
					//save token
					tokenControlService.setToken(tokenRefreshed.data.data);
					//request again
					self.apiRequest(method,url,params,successCb,failureCb);
					return false;
				},(err) =>{

				})
			}
			if (failureCb) failureCb(response);
		})
	};

	this.getUserInfo = (successCb, failureCb)=> {
		this.apiRequest('get',API.URL.user_info(),null,function(err,resp) {
			if(successCb && resp.data.data) {
				successCb(null,resp.data.data);
			}
		}, failureCb);
	}
});
