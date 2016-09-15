var app = angular.module('sortingHat', []);

app.controller('sortControl', function($scope, $http) {
	$scope.groups;
	$http({
		url: '/get-customer-groups' + location.search,
		method: 'GET',
	}).then(function(data) {
		$scope.groups = data.data.map(function(groupName) {
			return {
				name: groupName,
				mapGroup: false,
				formField: {
					type: '',
					name: '',
					value: ''
				}
			}
		});
	})

	$scope.checkboxChange = function(name) {
		$scope.groups.forEach(function(i) {
			if (i.name === name) {
				i.mapGroup = (i.mapGroup === true ? false : true);
			}
		})
	}
})
