'use strict';

angular.module('desafiohu', [
  'ui.bootstrap',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'kf.focusOn'
  ])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .otherwise({
    redirectTo: '/'
  });

  $routeProvider
      .when('/', {
        templateUrl: 'app/availability/availability.html',
        controller: 'AvailabilityCtrl'
      });

  $locationProvider.html5Mode(true);
});