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

directives.directive('managetags', ['$modal',function($modal) {
	return {
		restrict: 'E',
		require: 'ngModel',
		scope: {
			tags: "=ngModel",
			manage_id: '@',
			title: '@',
			name: '@',
			refreshcallback: '&'
		},
		template: "<div class=\"row\">"+
					"<div class=\"well well-sm well-tag-manage\">"+
						"<span><b>{{title}}</b></span><span class=\"label label-default manage-label-button margin-left5\" id=\"{{name}}\" ng-click=\"manageRecipients()\">Manage</span>"+
						"<div class=\"margin-top10\"><span ng-bind=\"tags.displayTags | managetags:15\"></span><span ng-if=\"tags.displayTags.length > 15\" class=\"label label-default label-manage-more margin-left5\" ng-click=\"manageRecipients()\">{{tags.displayTags.length - 15}}&nbsp;more</span></div>"+
					"</div>"+
				"</div>",
		replace: true,
		link : function(scope, element, attrs){
			scope.manageRecipients = function(){
				var modalInstance = $modal.open({
				      templateUrl: 'manageTagContent.html',
				      controller: 'ManageTagsCtlr',
				      windowClass: 'manageTagModal',
				      resolve: {
				    	  managedetails: function(){
				    		  return {'id':scope.manage_id};
				    	  },
				    	  tags: function(){
				    		  return scope.tags;
				    	  },
				    	  name: function(){
				    		  return scope.name;
				    	  },
				    	  refreshcallback: function(){
				    		  return scope.refreshcallback;
				    	  },
				    	  title: function(){
				    		  return scope.title;
				    	  }
				      }
				});
			}
		}
	}; 
}]);




