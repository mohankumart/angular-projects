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

angularApp.controller("responsivePanel1Ctlr",['$scope', function($scope){
	$scope.header = "Responsive panel 1";
	$scope.content = "Responsive Panel Content";
}]);

angularApp.controller("responsivePanel2Ctlr",['$scope', function($scope){
	$scope.header = "Responsive panel 2";
	$scope.content = "Responsive Panel Content";
}]);

angularApp.controller("responsivePanel3Ctlr",['$scope', function($scope){
	$scope.header = "Responsive panel 3";
	$scope.content = "Responsive Panel Content";
}]);

angularApp.controller("responsivePanel4Ctlr",['$scope', function($scope){
	$scope.header = "Responsive panel 4";
	$scope.content = "Responsive Panel Content";
}]);

angularApp.controller("responsivePanel5Ctlr",['$scope', function($scope){
	$scope.header = "Responsive panel 5";
	$scope.content = "Responsive Panel Content";
}]);

angularApp.controller("responsivePanel6Ctlr",['$scope', function($scope){
	$scope.header = "Responsive panel 6";
	$scope.content = "Responsive Panel Content";
}]);

angularApp.controller("staticPanelCtlr",['$scope', function($scope){
	$scope.header = "Static Panel";
	$scope.content = "Satic Panel Content - Resizing window does not resize this panel";
}]);


