var app = angular.module('workshopApp', []);

app.controller('PlaceListCtrl', function ($scope, $http) {
  $scope.places = [];

  $http.get('/api/places').success(function (data) {
    $scope.places = data.places;
  });

});
