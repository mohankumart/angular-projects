/**
 * Main application controller file
 */

var angularApp = angular.module("angularProjects",['angularProjects.services','angularProject.directives','angularProjects.filters','angularProjects.templates','ui.bootstrap']);
angular.module('angularProjects.templates',["tags-auto-complete.html","manageTagContent.html"]);

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
	$scope.manage_id = 1;
	$scope.data = {};
	$scope.getEmails = function(){
		//populate the emails here
		$scope.data = {"emails": {"deleteTags": [], "newTags": [], "displayTags": [{"isRemove": false, "type": "display", "tagName": "tmk_mohankumar@yahoo.com"},{"isRemove": false, "type": "display", "tagName": "mohan1629@gmail.com"}]}};
	};
	$scope.getEmails();
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

angularApp.controller('warnCSVDownloadCtrl',['$scope','$modalInstance','$timeout','errorService','successService',function ($scope, $modalInstance,$timeout,errorService,successService) {

	$scope.yesCSVWarnOk = function () {
		$modalInstance.dismiss('cancel');
	};

	$modalInstance.opened.then(function(){
		$timeout(function(){
			//hack - as angular killed bootstrap modal events
		$('.warnCSVDownloadModal').centerModal();
		});
    });
}]);


angularApp.controller('ManageTagsCtlr',['$scope','$modalInstance','managedetails','title','tags','name','refreshcallback','saveRules', function ($scope, $modalInstance,managedetails,title,tags,name,refreshcallback,saveRules) {
		$scope.tags = tags;
		$scope.policy_id = managedetails.policy_id;
		$scope.managedetails = managedetails;
		$scope.name = name;
		$scope.title = title;
		
		if(window.FileReader){
			$scope.isFileReader = true;
		}else{
			$scope.isFileReader = false;
		}
		$scope.refreshcallback = refreshcallback;
		$scope.cancelManageTagModal = function () {
			$modalInstance.dismiss('cancel');
		};
		$scope.isformError = false;
		$scope.buluploadMessage = 'All your changes on this screen will be lost, and entries from uploaded file will over-write the current configuration.';
		$scope.showBulkUploadScreen = false;

		$scope.hidebulkUploadScreen = function(){
			$scope.showBulkUploadScreen = false;
		}

		$scope.showbulkUploadScreen = function(){
			$scope.showBulkUploadScreen = true;
		}


		$scope.readMethod = "readAsText";

	    $scope.onReaded = function( e, file ){
	    	  if(e.target.result){
	    		  $scope.showBulkUploadScreen = false;
		      	  var uploadTags = (e.target.result).split(',');
		      	  //push the tags to delete block
		      	  $.each($scope.displayTags,function(index,displaytag){
		      		  var isDisplayTagInUploadTags = false;
		      		  $.each(uploadTags,function(uploadtagindex,uploadtagName){
		      			  if(displaytag.tagName == uploadtagName.trim()){
		      				  isDisplayTagInUploadTags = true;
		      				  displaytag.isRemove = false;
		      			  }
		      		  });
		      		  if(!isDisplayTagInUploadTags){
		      			  //if display tag already in delete mode then no need to push into delete array again.
		      			  var displayTagIndeleteTag = false;
		      			  $.each($scope.deleteTags,function(deleteTagindex,deletetagName){
		      				  if(deletetagName.tagName == displaytag.tagName){
		      					displayTagIndeleteTag = true;
		      				  }
		      			  });
		      			  if(!displayTagIndeleteTag){
		      				  $scope.displayTags[index].isRemove = true;
		      				  var newTag = {'tagName':displaytag.tagName,'isRemove':false,'type':'remove'};
		      				  $scope.deleteTags.push(newTag);
		      			  }
		      		  }
		      	  });
		      	  //add the new tags to new block
		      	  var uploadTags = (e.target.result).split(',');
		      	  $.each(uploadTags,function(uploadtagindex,uploadtagName){
		      		  var isUploadTagInDisplayTags = false;
		      		  var isUploadTagInNewTags = false;
		      		  $.each($scope.displayTags,function(index,displaytag){
		      			  if(uploadtagName.trim() == displaytag.tagName){
		      				  isUploadTagInDisplayTags = true;
		      			  }
		      		  });

		      		  if(!isUploadTagInDisplayTags && !isUploadTagInNewTags){
		      			  if(uploadtagName != ""){
		      				  var pattern,invalid = false;
		      				  if(name == 'sender'){
		      					  /*pattern = new RegExp("^(?:\\w|[-+.])+@(?:(?:\\w|[-+])+\\.)+(?:\\w|[-+])+$");
		      					  if(pattern.test(uploadtagName)){
		      						  invalid = false;
		      					  }else{
		      						  invalid = true;
		      					  }*/
		      					  invalid = false;
		      					  var newEmailTag = {'tagName':uploadtagName,'isRemove':false,'type':'new','invalid':invalid};
		      				  }else if(name == 'recipient'){
		      					  /*pattern = new RegExp("(?:\\w|[-+.])+@"+$scope.domain_name,"i");
		      					  if(pattern.test(uploadtagName)){
		      						  invalid = false;
		      					  }else{
		      						  invalid = true;
		      					  }*/
		      					  invalid = false;
		      					  var newEmailTag = {'tagName':uploadtagName,'isRemove':false,'type':'new','invalid':invalid};
		      				  }else{
		      					var newEmailTag = {'tagName':uploadtagName,'isRemove':false,'type':'new'};
		      				  }

			      			  $scope.newTags.push(newEmailTag);
		      			  }

		      		  }
		      	  });
	      	}

	    }



		$scope.onNewTagsReaded = function(e, file){
			if(e.target.result){
	    		var uploadTags = (e.target.result).split(',');
	    		$.each(uploadTags,function(uploadtagindex,uploadtagName){
	      			var isUploadTagInDisplayTags = false;
	      			var isUploadTagInNewTags = false;
	      			$.each($scope.displayTags,function(index,displaytag){
	      				if(uploadtagName == displaytag.tagName && displaytag.isRemove != true){
	      					isUploadTagInDisplayTags = true;
	      				}
	      			});

	      			if(!isUploadTagInDisplayTags && !isUploadTagInNewTags){
	      				var pattern,invalid = false;
	      				if(name == 'sender'){
	      					  /*pattern = new RegExp("^(?:\\w|[-+.])+@(?:(?:\\w|[-+])+\\.)+(?:\\w|[-+])+$");
	      					  if(pattern.test(uploadtagName)){
	      						  invalid = false;
	      					  }else{
	      						  invalid = true;
	      					  }*/
	      					  invalid = false;
	      					  var newEmailTag = {'tagName':uploadtagName,'isRemove':false,'type':'new','invalid':invalid};
	      				 }else if(name == 'recipient'){
	      					  /*pattern = new RegExp("(?:\\w|[-+.])+@"+$scope.domain_name,"i");
	      					  if(pattern.test(uploadtagName)){
	      						  invalid = false;
	      					  }else{
	      						  invalid = true;
	      					  }*/
	      					  invalid = false;
	      					  var newEmailTag = {'tagName':uploadtagName,'isRemove':false,'type':'new','invalid':invalid};
	      				 }else{
	      					var newEmailTag = {'tagName':uploadtagName,'isRemove':false,'type':'new'};
	      				 }
	      				$scope.newTags.push(newEmailTag);
	      			}
	      		});
	    	}
		}

		$scope.searchInitialized = false;

		$scope.displayTags = $scope.tags.displayTags;

		$scope.searchTags = $scope.tags.displayTags;

		$scope.tagSelected = undefined;
		$scope.istagSearched = false;

		$scope.displayTagSelected = function($item, $model, $label){
			var selectedVal = $("#search-autocomplete").val();
			if(selectedVal == ""){
				$scope.searchInitialized = false;
				$scope.displayTags = angular.copy($scope.currentDisplayTags);
			}else{
				$scope.searchInitialized = true;
				if($label != "" && ($label != undefined)){
					selectedVal = $label;
				}
				$scope.displayTags = angular.copy($scope.currentDisplayTags);
				$scope.displayTags = $.grep($scope.displayTags,function(tag){
					return (tag.tagName.indexOf(selectedVal) > -1);
				});
			}
		}

		$scope.clearAll = function(){
			$scope.newTags.length = 0;
  		  	$scope.newTags = [];
  		    $scope.managesubmittederror = false;
		}

		$scope.$watch("searchInitialized",function(newValue, oldValue){
			if(newValue){
				$scope.istagSearched = true;
			}else{
				$scope.istagSearched = false;
			}
		});

		$scope.customSearchInit = function(){
			if($scope.searchInitialized ){
				$("#search-autocomplete").val('');
			}
			$scope.displayTagSelected();
		}

		$scope.deleteTags = $scope.tags.deleteTags;

		$scope.newTags = $scope.tags.newTags;

		$scope.displayTagCount = $scope.displayTags.length;
		$scope.removeTagCount = $scope.deleteTags.length;
		$scope.newtagCount = $scope.newTags.length;

		$scope.$watchCollection("displayTags",function(newValue, oldValue){
			$scope.displayTagCount = $scope.displayTags.length;
			//maintain the copy for search purpose
			if(!$scope.searchInitialized){
				$scope.currentDisplayTags = angular.copy($scope.displayTags);
			}
		});

		$scope.$watchCollection("deleteTags",function(newValue, oldValue){
			$scope.removeTagCount = $scope.deleteTags.length;
		});

		$scope.$watchCollection("newTags",function(newValue, oldValue){
			$scope.newTagCount = $scope.newTags.length;
		});

		$scope.displayTagRemoved = function(tag) {
			$.each($scope.currentDisplayTags,function(currentIndex,currentTag){
				if(currentTag.tagName == tag.tagName){
					currentTag.isRemove = true;
				}
			});
			var newTag = {'tagName':tag.tagName,'isRemove':false,'type':'remove'};
			$scope.deleteTags.push(newTag);
		};

		$scope.newTagRemoved = function(tag) {
			var isErrorInNewTags = false;
			if(name == 'sender' || name == 'recipient'){
				$.each($scope.newTags,function(newtagindex,newtagvalue){
					if(newtagvalue.invalid == true){
						isErrorInNewTags = true;
					}
				});
			}
			if(isErrorInNewTags){
				$scope.managesubmittederror = true;
			}else{
				$scope.managesubmittederror = false;
			}
		};

		$scope.isManageSave = true;

		$scope.inValidTag = function(tag){
			$scope.isManageSave = false;
		}

		$scope.validTag = function(tag){
			$scope.isManageSave = true;
		}

		$scope.deleteTagRemoved = function(tag) {
			var newTag = {'tagName':tag.tagName,'isRemove':true,'type':'display'};
			var index = -1;
			$.each($scope.displayTags,function(emailindex,value){
				if(tag.tagName == value.tagName){
					index = emailindex;
				}
			});

			if(index != -1){
				var tag = $scope.displayTags[index];
				tag.isRemove = false;
				$.each($scope.currentDisplayTags,function(currentIndex,currentTag){
					if(currentTag.tagName == tag.tagName){
						currentTag.isRemove = false;
					}
				});
			}

			//check the new tags and remove it from there if the tag is present
			$scope.newTags = $.grep($scope.newTags,function(currentnewtag){
				return (newTag.tagName != currentnewtag.tagName);
			});
		};

		$modalInstance.opened.then(function(){

		});

		$scope.showtlsapplyallscreen = false;

		$scope.hidetlsapplyscreen = function(){
			$scope.showtlsapplyallscreen = false;
		}

		$scope.showtlsapplyscreen = function(){
			$scope.showtlsapplyallscreen = true;
		}

		$scope.showConfirmIpscreen = false;
		$scope.showAddConfirmIpscreen = false;

		$scope.hideIpconfirmscreen = function(){
			$scope.showConfirmIpscreen = false;
		}

		$scope.showPortalAccessIpconfirmscreen = function(){
			var isConfirm = true;
			$.each($scope.displayTags,function(index,value){
				if(!value.isRemove){
					isConfirm = false;
				}
			});

			if(!isConfirm){
				$scope.showConfirmIpscreen = false;
				if($scope.newTags.length > 0){
					$scope.showAddConfirmIpscreen = true;
				}else{
					$scope.updateTags(false);
				}
			}else{
				if($scope.newTags.length > 0){
					$scope.showConfirmIpscreen = false;
					$scope.showAddConfirmIpscreen = true;
				}else{
					$scope.showConfirmIpscreen = true;
				}
			}
		}

		$scope.showIpconfirmscreen = function(){
			var isConfirm = true;
			$.each($scope.displayTags,function(index,value){
				if(!value.isRemove){
					isConfirm = false;
				}
			});

			if(!isConfirm){
				$scope.showConfirmIpscreen = false;
				$scope.updateTags(false);
			}else{
				if($scope.newTags.length > 0){
					$scope.showConfirmIpscreen = false;
					$scope.updateTags(false);
				}else{
					$scope.showConfirmIpscreen = true;
				}

			}
		}

		$scope.hideAddIpconfirmscreen = function(){
			$scope.showAddConfirmIpscreen = false;
		}


		$scope.managesubmittederror = false;
		$scope.submitmanagedata = false;
		$scope.updateTags = function(applyAll){
			$scope.submitmanagedata = true;
			$scope.isformError = false;
			$scope.managesubmittederror = false;
			if(name == 'sender' || name == 'recipient'){
				$.each($scope.newTags,function(newtagindex,newtagvalue){
					if(newtagvalue.invalid == true){
						$scope.managesubmittederror = true;
						$scope.submitmanagedata = false;
						return false;
					}
				});
			}
			if(!$scope.managesubmittederror){
				var submittags = {'deleteTags':[],'newTags':[]};

				if($scope.deleteTags.length > 0){
					submittags.deleteTags.length = 0;
					submittags.deleteTags = $scope.deleteTags;
				}
				if($scope.newTags.length > 0){
					submittags.newTags.length = 0;
					submittags.newTags = $scope.newTags;
				}
				var obj = {};
				obj[$scope.name] = submittags;

				var saveRulesPromise = saveRules($scope.managedetails,$scope.ruletype,obj);
				saveRulesPromise.then(function(result){
					if(result.isError){
						$scope.isformError = true;
						$scope.submitmanagedata = false;
						$scope.formErrorHeading = result.errors.__all__;
						$scope.formErrors = [];
						$.each(result.errors,function(key,value){
							if(key !== '__all__'){
								$scope.formErrors.push({'name':key,'value':value});
							}
						});
					}else{
						$scope.isformError = false;
						$modalInstance.close(result.successMessage);
					}
				},function(reason){

				});
			}

		}

		$modalInstance.result.then(function(message){
			$scope.refreshcallback();
			successService.setSuccess(message);
		});

}]);


//code for upload csv -
angularApp.controller('uploadCSVCtrl',['$scope','$modalInstance','$timeout','targetEle', function ($scope, $modalInstance, $timeout,targetEle) {

	$scope.cancelUploadCSV = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.UploadCSV = function () {
		var reader = new FileReader();
        reader.onload = function(onLoadEvent) {
        	angular.element('#'+targetEle).data('$ngModelController').$setViewValue(onLoadEvent.target.result);
        	$('#'+targetEle).val(onLoadEvent.target.result);
            $modalInstance.dismiss('cancel');
        };
        reader.readAsText($("#uploadcsv")[0].files[0]);
	};

	$modalInstance.opened.then(function(){
		$timeout(function(){
			//hack - as angular killed bootstrap modal events
			$('.uploadCSVModal').centerModal();
		});
	});

}]);

