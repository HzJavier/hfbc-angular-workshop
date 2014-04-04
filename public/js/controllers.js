var app = angular.module('workshopApp', []);

app.controller('PlaceListCtrl', function ($scope) {
  $scope.places = [
    { 'name': 'Tec', 'location': '123.213, 123.242342' },
    { 'name': 'IEEE', 'location': '123.33, 123.4334' }
  ];
});
