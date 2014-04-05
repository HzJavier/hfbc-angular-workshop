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
      when('/place/:placeId', {
        templateUrl: 'partials/place_detail.html',
        controller: 'PlaceDetailCtrl'
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

app.controller('PlaceDetailCtrl', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {
    $scope.place;

    $http.get('/api/places/' + $routeParams.placeId).success(function (data) {
      $scope.place = data;
    });

    $scope.getLocation = function () {
      alert('Location: ' + $scope.place.location);
    };
  }
]);
