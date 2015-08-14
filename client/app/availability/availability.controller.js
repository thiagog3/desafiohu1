'use strict';

angular.module('desafiohu')
.controller('AvailabilityCtrl', function ($scope, HuResource, $q, $modal) {
	
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
		var parameters = {
			module: 'availability',
			action: 'hotel',
			startDate: $scope.startPicker.getDate().getTime(),
			endDate: $scope.endPicker.getDate().getTime()
		};

		if ($scope.selectedPlace.type === 'city') {
			parameters.city = $scope.selectedPlace.city;
		};

		if ($scope.selectedPlace.type === 'hotel') {
			parameters.hotelId = $scope.selectedPlace.hotel.id;
		};

		HuResource.query(parameters, function(result){
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
		$scope.selectedPlace = null;
		$scope.selectPlaceFocus = true;
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

	$scope.viewAvailability = function(availabilityItem){
		$scope.selectedAvailability = availabilityItem;
		$scope.modalInstance=$modal.open({
			templateUrl: 'availabilityModal.html',
			scope:$scope
		});
	};

	$scope.closeAvailability=function(){
    $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
};
});