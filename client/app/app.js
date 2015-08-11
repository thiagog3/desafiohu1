'use strict';

angular.module('desafiohu', [
  'ui.bootstrap',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'kf.focusOn',
  'pikaday'
  ])
.config(function ($routeProvider, $locationProvider, pikadayConfigProvider) {
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

  pikadayConfigProvider.setConfig({
    format: 'DD/MM/YYYY',
    minDate: new Date(),
    i18n: {
      previousMonth : 'Mês anterior',
      nextMonth     : 'Próximo mês',
      months        : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      weekdays      : ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
      weekdaysShort : ['Dom','Seg','Ter','Qua','Qu','Sex','Sab']
    },
    numberOfMonths: 2
  });

}).directive('focus', function($timeout, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          scope.$watch(attrs.focus, function(newValue, oldValue) {
              if (newValue) { element[0].focus(); }
          });
          element.bind("blur", function(e) {
              $timeout(function() {
                  scope.$apply(attrs.focus + "=false"); 
              }, 0);
          });
          element.bind("focus", function(e) {
              $timeout(function() {
                  scope.$apply(attrs.focus + "=true");
              }, 0);
          })
      }
    }
  });