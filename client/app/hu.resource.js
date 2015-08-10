'use strict';

angular.module('desafiohu')
    .factory('HuResource', function ($resource) {
        return $resource('http://localhost:9000/api/:module/:action',  {}, { query: { isArray: true }});
    });