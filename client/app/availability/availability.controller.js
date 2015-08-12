'use strict';

angular.module('desafiohu')
.controller('AvailabilityCtrl', function ($scope, HuResource, $q) {
	
	$scope.dateDisabled = false;

	$scope.searchPlaces = function(searchParameter){
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

	$scope.getAvailability = function(){
		HuResource.query({
			module: 'availability',
			action: 'hotel',
			id: $scope.selectedHotel.id,
			startDate: $scope.startPicker.getDate().getTime(),
			endDate: $scope.endPicker.getDate().getTime()
		}, function(result){
			$scope.availabilities = result;
		});
	}

	$scope.searchDescription = function(item){
		if(!item){
			return;
		}
		if(item.type === 'hotel'){
			return item.hotel.name + ', ' + item.city;
		}
		return item.city;
	}

	$scope.clearSelected = function() {
		$scope.selectedHotel = null;
		$scope.selectHotelFocus = true;
    };

    $scope.startPickerOnSelect =  function(pikaday){
    	$scope.endPicker.setMinDate(pikaday.getDate());
    	$scope.endPicker.gotoDate(pikaday.getDate());
    	$scope.endDateFocus = true;
    };


    $scope.$watch('disableDates', function(newValue){
    	if(!$scope.endPicker || !$scope.startPicker){ return; }
    	$scope.endPicker.setDate(null);
    	$scope.startPicker.setDate(null);
    });
});