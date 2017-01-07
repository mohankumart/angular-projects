/**
 * Main application controller file
 */

var angularApp = angular.module("angularProjects",['angularProject.directives']);

angularApp.controller("angularProjectsCtlr",['$scope', function($scope){
	$scope.name = "Hello Angular Projects";
	$scope.currentView = "dynamicLayout";
	$scope.selectRoot = function(root){
		$scope.currentView = root;
	}
}]);

angularApp.controller("dynamicLayoutCtlr",['$scope', function($scope){
	$scope.layoutMode = "responsiveStatic";
	$scope.changeLayout = function(mode){
		$scope.layoutMode = mode;
	}
}]);

angularApp.controller("tagInputCtlr",['$scope', function($scope){
	$scope.tagInputs = "Hello tag Inputs";
}]);

angularApp.controller("scrollTabsCtlr",['$scope', function($scope){
	$scope.scrollTabs = "Hello scroll Tabs";
}]);



