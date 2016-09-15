var app = angular.module('sortingHat', []);

app.controller('groupsController', function($scope) {
	$scope.groups = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
});
