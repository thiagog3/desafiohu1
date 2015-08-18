'use strict';

angular.module('desafiohu')
.controller('AvailabilityCtrl', function ($scope, HuResource, $q, $modal) {
	
	var toggleValidation = function(bool){
		$scope.dateDisabled = bool;
		$scope.isValidPlace = bool;
		$scope.isValidStartDate = bool;
		$scope.isValidEndDate = bool;
	};

	toggleValidation(true);

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

	$scope.onSelectPlace = function(){
		$scope.isValidPlace = true;
	};

	$scope.getAvailability = function(){	

		if(!isValidFields()){
			return;
		}

		var parameters = {
			module: 'availability',
			action: 'hotel'
		};

		if(!$scope.disableDates){
			parameters.startDate = $scope.startPicker.getDate().getTime();
			parameters.endDate = $scope.endPicker.getDate().getTime();
		}

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
		$scope.isValidStartDate = true;
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
		$scope.modalInstance.dismiss();
	};

	var isValidFields = function(){

		var isValid = true;
		toggleValidation(true);

		if(!$scope.selectedPlace){
			$scope.isValidPlace = false;
			isValid = false;
		}
		if(!$scope.disableDates && $scope.endPicker.getDate() === null){
			$scope.isValidEndDate = false;
			isValid = false;
		}

		if(!$scope.disableDates && $scope.startPicker.getDate() === null){
			$scope.isValidStartDate = false;
			isValid = false;
		}
		return isValid;
	};
});