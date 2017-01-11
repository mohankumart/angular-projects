/**
 * filters
 */

var filterModule = angular.module('angularProjects.filters',[]);

filterModule.filter('managetags', ['$sce',function ($sce) {
    return function (input,showlimit) {
    	if(!input) return '';
    	var inputlen = input.length;
    	var retStr = '';
    	if(inputlen > 0){
    		if(inputlen > 15){
				$.each(input,function(index,tag){
    				if(index == (showlimit-1)){
    					retStr += (tag.tagName);
    					return false;
    				}else{
    					retStr += (tag.tagName + ', ');
    				}
    			});
				return retStr;
    		}else{
    			$.each(input,function(index,tag){
    				if(index == (inputlen-1)){
    					retStr += tag.tagName;
    				}else{
    					retStr += tag.tagName + ', ';
    				}
    			})
    			return retStr;
    		}
    	}else{
    		 return "";
    	}
       
    };
}]);


