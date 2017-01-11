/**
 * angular project services
 */
var services = angular.module('angularProjects.services',['ngResource']);

services.factory('saveRules',['$http','$q',function($http,$q){
	return function(rulesDetails){
		var delay = $q.defer();
		delay.resolve(rulesDetails);
		return delay.promise;
		
	};
}]);


