/**
 * Creates our angular application
 * - ngRoute is for template routing
 * - placesControllers is the controller we created for all the other data
 */
var app = angular.module('workshopApp', [
  'ngRoute',
  'placesControllers' 
]);

/**
 * Configure the routes for the application
 */
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

/**
 * Our controller object for the views
 */
var placesControllers = angular.module('placesControllers', []);

/**
 * The controller for the list view
 */
app.controller('PlaceListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.places = [];

    $http.get('/api/places').success(function (data) {
      $scope.places = data.places;
    });

}]);

/**
 * The controller for the detail view
 * This requires $routeParams to catch information from the url route.
 */
app.controller('PlaceDetailCtrl', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {
    var domReady = false;
    var map;
    var latLng;

    $scope.place;

    /**
     * If the template route is http://localhost:5000/index.html#/places/0
     * then $routeParams.placeId = 0 and the api call will be /api/places/0
     *
     */
    $http.get('/api/places/' + $routeParams.placeId).success(function (data) {
      $scope.place = data;
      if (domReady) {
        loadMap();  // Do not load the map until the dom is ready
      }
    });

    /**
     * Example of ng-click and other events from the dom
     */
    $scope.getLocation = function () {
      alert('Location: ' + $scope.place.location);
    };

    var mapDom = document.getElementById('map');
    angular.element(mapDom).ready(function () {
      domReady = true;
      if ($scope.place) {
        loadMap();    // Do not load the map until we get data form the server. What happens first
      }
    });

    /**
     * Creates a google map
     */
    function loadMap() {
      latLng = new google.maps.LatLng($scope.place.lat, $scope.place.lng);

      map = new google.maps.Map(document.getElementById("map"), {
        center: latLng,
        zoom: 14 
      }); 

      addMarker(latLng, map);
    }

    /**
     * Adds a marker to the map
     */
    function addMarker (latLng, map) {
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true
      });
    }
  }
]);

/**
 * This directive is just to be able to use holder.js lib.
 * Do not pay too much attention to this
 */
app.directive('holderFix', function () {
  return {
    link: function (scope, element, attrs) {
      Holder.run({ images: element[0], nocss: true });
    }
  };
});
