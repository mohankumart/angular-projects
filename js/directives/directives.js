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
    						staticPanelWidth = 250;
            	
            	if(mode == 'responsiveStatic'){
	            	if(eleId == 'responsive-panel1' || eleId == 'responsive-panel2' || eleId == 'responsive-panel3'){
	            		eleWidth = (newValue.w - 75 - staticPanelWidth)/3;
	            		eleHeight = 200;
	            	}else if(eleId == 'responsive-panel4'){
	            		eleWidth = eleWidth = (newValue.w - 45 - staticPanelWidth);
	            		eleHeight = 400;
	            	}else if(eleId == 'static-panel'){
	            		eleWidth = staticPanelWidth;
	            		eleHeight = 600 + 20;
	            	}
            	}else if(mode == 'responsive'){
            		if(eleId == 'responsive-panel1' || eleId == 'responsive-panel2' || eleId == 'responsive-panel3' || eleId == 'responsive-panel4'){
	            		eleWidth = (newValue.w - 75)/4;
	            		eleHeight = 200;
	            	}else if(eleId == 'responsive-panel5' || eleId == 'responsive-panel6'){
	            		eleWidth = (newValue.w - 45)/2;
	            		eleHeight = 400;
	            	}
            	}
            	
            	return {
                	'width': (eleWidth) + 'px',
                	'height': (eleHeight) + 'px'
                };
            };
            scope.test ="hello";
        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});
