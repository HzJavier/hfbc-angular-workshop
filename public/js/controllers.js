var app = angular.module('workshopApp', [
  'ngRoute',
  'placesControllers' 
]);

app.config(['$routeProvider', 
  function ($routeProvider) {
    $routeProvider.
      when('/places', {
        templateUrl: 'partials/list_view.html',
        controller: 'PlaceListCtrl'
      }).
      otherwise({
        redirectTo: '/places'
      });
  }
]);


var placesControllers = angular.module('placesControllers', []);

app.controller('PlaceListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.places = [];

    $http.get('/api/places').success(function (data) {
      $scope.places = data.places;
    });

}]);
