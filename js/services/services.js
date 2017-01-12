/**
 * angular project services
 */
var services = angular.module('angularProjects.services',['ngResource']);

services.factory('saveRules',['$http','$q',function($http,$q){
	return function(rulesDetails){
		$.each(rulesDetails.emails.deleteTags,function(index,deleteTag){
			tags.emails.displayTags = $.grep(tags.emails.displayTags,function(currentnewtag){
				return (deleteTag.tagName != currentnewtag.tagName);
			});
		});
		
		$.each(rulesDetails.emails.newTags,function(index,newTag){
			var found = false;
			$.each(tags.emails.displayTags,function(index,displayTag){
				if(newTag.tagName == displayTag.tagName){
					found = true
				}
			});
			if(!found){
				newTag.type = 'display';
				tags.emails.displayTags.push(newTag);
			}
		});
		
		var delay = $q.defer();
		tags.emails.newTags.length = 0;
		tags.emails.deleteTags.length = 0;
		delay.resolve(tags);
		return delay.promise;
		
	};
}]);


