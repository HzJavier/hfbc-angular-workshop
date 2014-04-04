var app = angular.module('workshopApp', []);

app.controller('PlaceListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.places = [];

    $http.get('/api/places').success(function (data) {
      $scope.places = data.places;
    });

}]);
