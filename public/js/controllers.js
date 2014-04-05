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
    var domReady = false;
    var map;
    var latLng;

    $scope.place;

    $http.get('/api/places/' + $routeParams.placeId).success(function (data) {
      $scope.place = data;
      if (domReady) {
        loadMap();
      }
    });

    $scope.getLocation = function () {
      alert('Location: ' + $scope.place.location);
    };

    var mapDom = document.getElementById('map');
    angular.element(mapDom).ready(function () {
      domReady = true;
      if ($scope.place) {
        loadMap();
      }
    });

    function loadMap() {
      latLng = new google.maps.LatLng($scope.place.lat, $scope.place.lng);

      map = new google.maps.Map(document.getElementById("map"), {
        center: latLng,
        zoom: 14 
      }); 

      addMarker(latLng, map);
    }

    function addMarker (latLng, map) {
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true
      });
    }
  }
]);

app.directive('holderFix', function () {
  return {
    link: function (scope, element, attrs) {
      Holder.run({ images: element[0], nocss: true });
    }
  };
});
