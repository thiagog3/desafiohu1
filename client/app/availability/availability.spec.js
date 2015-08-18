'use strict';

describe('AvailabilityCtrl', function () {
	var scope;
	var $httpBackend;
	var HuResourceMock;
	var rootScope;
	var $timeout;
	
	beforeEach(module('desafiohu'));
  
	beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_, $q, _$timeout_, HuResource) {
		$timeout = _$timeout_;
		$httpBackend = _$httpBackend_;
		rootScope = _$rootScope_;
		HuResourceMock = HuResource;
		
		scope = rootScope.$new();
		$controller('AvailabilityCtrl', {
			'$scope': scope,
			'HuResource': HuResourceMock
		});
		
		rootScope.$apply();
	}));
   
    it('should get method of HuResource is called on searchPlaces()', function (){

    	var url = 'http://localhost:9000/api/hotels/query';
		$httpBackend.expectGET(new RegExp('\\' + url)).respond([{
        	type: 'hotel', hotel: {name: 'Veneza'}, city: 'Barra Mansa'
        }]);

		scope.searchPlaces();
		$httpBackend.flush();
	});
	
	it('should getAvailability() is OK', function (){
		scope.startPicker = {
			getDate: function(){
				var start = new Date(2015,5,1);
				return start;
			}
		};
		scope.endPicker = {
			getDate: function(){
				var start = new Date(2015,5,20);
				return start;
			}
		};
		scope.selectedPlace = { type: 'city', city: 'Barra Mansa' };

		var url = 'http://localhost:9000/api/availability/hotel';
		$httpBackend.expectGET(new RegExp('\\' + url)).respond([{
        	city: 'Barra Mansa'
        }]);

		scope.getAvailability();
		$httpBackend.flush();
		expect(scope.availabilities.length).toBe(1);
	});
});