/**
 * project template files
 */
angular.module("tags-auto-complete.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put('ngTagsInput/auto-complete.html',
			"<div class=\"autocomplete\" ng-show=\"suggestionList.visible\"><ul class=\"suggestion-list\"><li class=\"suggestion-item\" ng-repeat=\"item in suggestionList.items track by track(item)\" ng-class=\"{selected: item == suggestionList.selected}\" ng-click=\"addSuggestionByIndex($index)\" ng-mouseenter=\"suggestionList.select($index)\" ng-bind-html=\"highlight(item)\"></li></ul></div>"
	);
}]);

angular.module("manageTagContent.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("manageTagContent.html",
		  "<div class=\"modal-header\">"+
		  	"<button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"cancelManageTagModal()\">&times;</button>"+
		  	"<h3>Manage {{title}}</h3>"+
		  	"<div ng-if=\"!showBulkUploadScreen && isFileReader\" class=\"row\">"+
				"<button href=\"#\" role=\"button\" ng-disabled=\"submitmanagedata\" ng-click=\"showbulkUploadScreen()\" id=\"bulkupload\" type=\"button\" class=\"btn btn-primary\">Bulk Upload</button>"+   
			"</div>"+
			"<div ng-if=\"showBulkUploadScreen && isFileReader\" class=\"row margin-minus-left15 margin-minus-right15 inline-pop-box\">"+
				"<div ng-include src=\"'bulkUploadDocumentContent.html'\"></div>"+
			"</div>"+
		  "</div>"+
		  "<div class=\"modal-body\">"+
		  		"<div class=\"row\">"+
		  			"<div ng-if=\"isformError\" form-error></div>"+
		  		"</div>"+
				"<div class=\"row margin-bottom15 manage-outline\">"+
					"<div class=\"row\">"+
						"<div class=\"col-xs-8 margin-top5 padding-nullify\">"+
							"<span><b>Current Configuration ({{displayTagCount}})</b></span>"+
						"</div>"+
						"<div class=\"col-xs-4 padding-nullify margin-bottom5\">"+
							"<div class=\"input-group\">" +
								"<input type=\"text\" id=\"search-autocomplete\" ng-model=\"tagSelected\" typeahead-on-select=\"displayTagSelected($item, $model, $label)\" typeahead-focus-first=\"false\" typeahead-editable=\"false\" typeahead=\"tag as tag.tagName for tag in searchTags | filter:$viewValue\" placeholder=\"Search\" class=\"form-control input-sm alertstypeahead border-radius-nullify\" aria-controls=\"etpAlerts\">" +
								"<span ng-click=\"customSearchInit()\" class=\"input-group-addon border-radius-nullify cursor-pointer\">" +
									"<span ng-class=\"{'glyphicon glyphicon-remove':istagSearched,'glyphicon glyphicon-search':!istagSearched}\"></span>" +
								"</span>" +
							"</div>"+
						"</div>"+
					"</div>"+
					"<tags-input type=\"displaytagscreen\" ng-model=\"displayTags\" add-on-space=\"true\" replace-spaces-with-dashes=\"false\" clearall=\"false\" isdisplayscreen=\"true\" isedit=\"false\" on-tag-removed=\"displayTagRemoved($tag)\" display-property=\"tagName\" placeholder=\"Add New Email\"></tags-input>"+
				"</div>"+
				"<div class=\"row margin-bottom15 manage-outline\">"+
					"<span><b>Entries Marked for Deletion ({{removeTagCount}})</b></span>"+
	  				"<tags-input type=\"deletetagscreen\" ng-model=\"deleteTags\" add-on-space=\"true\" replace-spaces-with-dashes=\"false\" clearall=\"false\" remove-tag-symbol=\"&#94\" isdisplayscreen=\"false\" isedit=\"false\" on-tag-removed=\"deleteTagRemoved($tag)\" display-property=\"tagName\" placeholder=\"Add New Email\"></tags-input>"+
	  			"</div>"+
			  	"<div class=\"row\">"+
			  		"<span><b>Entries to Add ({{newTagCount}})</b></span>"+
			  		"<div class=\"row managetags-navbar padding-top5 padding-bottom5\">"+
			  			"<div class=\"col-xs-6\" disabled=\"(submitmanagedata)\" id=\"addnewtags\" ng-file-reader buttontype=\"secondary-file\" accept=\"text/csv,text/plain\" name=\"Upload CSV - Add to Existing entries\" on-readed=\"onNewTagsReaded(event,file)\" read-method=\"readMethod\" ></div>"+
			  			"<div class=\"col-xs-6 text-right margin-top5\"><a hreaf=\"#\" class=\"cursor-pointer\" id=\"clearall\" ng-click=\"clearAll()\">Clear all</a></div>"+
			  		"</div>"+
		  			"<tags-input type=\"newtagscreen\" isdata=\"isdata\" ispermission= \"ispermission\" ng-if=\"name != 'recipient' && name != 'country' && name != 'sender'\" min-length=\"1\" isnewscreen=\"true\" ng-model=\"newTags\" clearall=\"true\" displaytags=\"displayTags\" on-tag-valid=\"validTag($tag)\" on-tag-in-valid=\"inValidTag($tag)\" add-on-space=\"true\" replace-spaces-with-dashes=\"false\" isdisplayscreen=\"false\" isedit=\"true\" display-property=\"tagName\" placeholder=\"Add new entry\"></tags-input>"+
		  		"</div>"+
		  		"<div>"+
		  			"<p ng-if=\"name == 'email'\" class=\"help-block\">Enter valid sending email domains (e.g. example.com).</p>"+
		  		"</div>"+
		  		"<div class=\"has-error\">"+
		  			"<p class=\"help-block\" ng-show=\"managesubmittederror\">Invalid entries</p>"+
		  		"</div>"+
		  		"<div ng-if=\"!showtlsapplyallscreen && !showConfirmIpscreen && !showAddConfirmIpscreen\" class=\"row margin-top15\">"+
		  			"<button ng-class=\"{'disabled':(!isManageSave)}\" type=\"submit\"  class=\"btn btn-primary\" ng-click=\"updateTags()\" id=\"savemanageupdatetags\">Save</button>"+
		  			"<span ng-hide=\"submitmanagedata\" class=\"margin-left10 margin-right10\">Or</span>"+
		  			"<a href=\"#\" ng-hide=\"submitmanagedata\" id=\"cancelmanageupdatetags\" ng-click=\"cancelManageTagModal()\">Cancel</a>"+
		  		"</div>"+
		  "</div>");
}]);

angular.module("tags-input.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put('ngTagsInput/tags-input.html',
			"<div class=\"host\" tabindex=\"-1\" ti-transclude-append=\"\">"+
				"<div id=\"{{type}}\" class=\"tags\" ng-class=\"{focused: hasFocus,'tags-display':isdisplayscreen,'tags-default':!isdisplayscreen,'tags-new':isnewscreen}\">"+
					"<ul class=\"tag-list\">" +
						"<li class=\"tag-item\" ng-mouseenter=\"tagon=true\" ng-mouseleave=\"tagon=false\" ng-class=\"{'tag-new-highlight':isNewType(tag),'tag-mouseover-new-highlight':(isNewType(tag) && tagon),'tag-remove-highlight':(isRemove(tag) || isRemoveType(tag)),'tag-mouseover-highlight':(!isRemove(tag) && !isRemoveType(tag) && tagon),'tag-remove-mouseover-highlight':((isRemove(tag) || isRemoveType(tag)) && tagon)}\" ng-repeat=\"tag in tagList.items track by $index\" ng-class=\"{ selected: tag == tagList.selected }\">"+
							"<span ng-class=\"{'tag-error':(isNewType(tag) && isInvalidTag(tag))}\" ng-bind=\"getDisplayText(tag)\" title=\"{{getDisplayText(tag, true)}}\"></span><span>{{tag.isRemoved}}</span> " +
							"<a class=\"remove-button\" ng-mouseenter=\"closetagon=true\" ng-mouseleave=\"closetagon=false\" ng-hide=\"isRemove(tag)\" ng-class=\"{'remove-button-delete':isRemoveType(tag),'remove-button-mouseover':closetagon}\" ng-click=\"tagList.remove($index)\"><span ng-bind=\"options.removeTagSymbol\"></span></a>" +
						"</li>" +
					"</ul>" +
					"<input class=\"input\" ng-show=\"isedit\" ng-model=\"newTag.text\" ng-change=\"newTagChange()\" ng-trim=\"false\" ti-bind-attrs=\"{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex}\" ti-autosize=\"\">" +
				"</div>" +
			"</div>"
	);
}]);

angular.module("bulkUploadDocumentContent.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("bulkUploadDocumentContent.html",
		  "<div>"+
		  	"<div><b>Bulk Upload</b></div>"+
		  	"<div class=\"row margin-bottom15 margin-top5\">"+
		  		"<span class=\"fontsize12\">{{bulkuploadMessage}}</span>"+
		  	"</div>"+
		  	"<div class=\"text-left\">"+
		  		"<div ng-file-reader id=\"updatemanagetags\" buttontype=\"primary\" name=\"Accept\" accept=\"text/csv,text/plain\" class=\"inlineblock\" on-readed=\"onReaded(event,file)\" read-method=\"readMethod\" ></div>"+
		  		"<a href=\"#\" class=\"margin-left10\" id=\"cancelbulkupload\" ng-click=\"hidebulkUploadScreen()\">Cancel</a>"+
		  	"</div>"+
		  "</div>");
}]);



