'use strict';

angular.module('desafiohu')
.controller('AvailabilityCtrl', function ($scope, HuResource, $q) {
	
	$scope.searchHotels = function(searchParameter){
		var deferred = $q.defer();
		HuResource.query({
			module: 'hotels',
			action: 'query',
			param: searchParameter
		}, function(result){
			 deferred.resolve(result);
		});
		return deferred.promise;
	};

	$scope.hotelDescription = function(hotel){
		if(!hotel){
			return;
		}
		return hotel.hotel + ', ' + hotel.local;
	}

	$scope.clearSelected = function() {
			$scope.selectedHotel = null;
            $scope.$broadcast('clearHotelSelection');
        };
});