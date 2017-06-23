var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/partials/login.html'
	}).when('/home', {
		templateUrl: 'views/partials/home.html'
	});
});

myApp.controller('shelfController', shelfController)

function shelfController(shelfService, $location) {
	var vm = this;
	vm.loggedInUser;
	vm.loggedInID;
	vm.loginToggle = true;
	vm.items = [];

	vm.toggleLogin = function() {
		vm.loginToggle = !vm.loginToggle
	}

	vm.register = function() {
		console.log('in controller register');
		// assemble credentialsObject
		var credentials = {
			username: vm.username,
			password: vm.password
		};
		shelfService.sendRegister(credentials).then(function() {
			// clear out inputs
			vm.username = "";
			vm.password = "";
		});
	};

	vm.logIn = function() {
		console.log('in controller logIn');
		var credentials = {
			username: vm.username,
			password: vm.password
		};
		shelfService.logIn(credentials).then(function(response) {
			console.log(response);

			vm.loggedInUser = response.username;
			vm.loggedInID = response.id;
			vm.username = "";
			vm.password = "";
		});
	};

	vm.logOut = function() {
		console.log('logging out', vm.loggedInUser);
		vm.loggedInUser = '';
		$location.path('/');
	};

	vm.addItem = function() {
		var itemToSend = {
			item: vm.item,
			url: vm.url,
			userID: vm.loggedInID
		}
		vm.url = '';
		vm.item = '';
		shelfService.addItem(itemToSend).then(function(res) {
			console.log(res);
			vm.getItems();
		});
	};

	vm.init = function() {
		vm.checkUser();
		vm.getItems();
	}

	vm.getItems = function() {
		console.log('in controller, getShelvs');
		shelfService.getItems().then(function(res) {
			console.log('in ctrl:', res);
			vm.items = res.data;
		});
	}

	vm.checkUser = function() {
		shelfService.checkUser().then(function(res) {
			console.log(res);
			if (res.data == "No User Logged") {
				sweetAlert("No User Logged In", "I remember my first time with a computer!", "error");
				$location.path('/');
			} else {
				vm.loggedInUser = res.data.username;
				vm.loggedInID = res.data.id;
			}
		});
	}

	vm.deleteItem = function(index) {
		console.log('item to delete:', index);
		shelfService.deleteItem(index).then(function() {
			console.log('back in controller', shelfService.deletedItem);
			vm.delete = shelfService.deletedItem;
			vm.getItems();
		});
	};

}
