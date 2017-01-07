/**
 * Angular project directives
 */

var directives = angular.module('angularProject.directives', []);

directives.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            scope.style = function (mode) {
            	var mode = $(element).attr('mode');
            	
            	var eleId = $(element).attr('id'),
    						eleWidth, 
    						eleHeight,
    						staticPanelWidth = 100;
            	
            	if(mode == 'responsiveStatic'){
	            	if(eleId == 'panel1'){
	            		eleWidth = 500;
	            		eleHeight = 500;
	            		
	            	}
            	}else if(mode == 'responsive'){
            		
            	}
            	
            	return {
                	'width': (eleWidth) + 'px',
                	'height': (eleHeight) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});
