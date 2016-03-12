app.controller('HomeController', function(Socket, Auth, $window, $rootScope, $location){

  var vm = this;

  vm.loggedIn = Auth.isLoggedIn();

  $rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
    console.log("We are here!");
		// get user information on page load
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});
	});

  Socket.on('notification', function(notification){
    console.log('Notification Received');
    $window.alert('Notification Received:',notification.title);
  })

  vm.doLogin = function() {

		// clear the error
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				//vm.processing = false;
				// if a user successfully logs in, redirect to users page
				if (data.success){
          Socket.emit('join:page', {userName: vm.loginData.username});
					$location.path('/');
        }
				else
					vm.error = data.message;

			});
	};

  vm.doLogout = function() {
		Auth.logout();
		vm.user = '';

		$location.path('/login');
	};



});
