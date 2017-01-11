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
				"<button href=\"#\" ng-class=\"{'disabled':!ispermission}\" role=\"button\" ng-disabled=\"submitmanagedata\" ng-click=\"showbulkUploadScreen()\" id=\"bulkupload\" type=\"button\" class=\"button primary normal\">Bulk Upload</button>"+   
			"</div>"+
			"<div ng-if=\"showBulkUploadScreen && isFileReader\" class=\"row margin-minus-left15 margin-minus-right15 inline-pop-box\">"+
				"<div ng-include src=\"'bulUploadDocumentContent.html'\"></div>"+
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
					"<tags-input type=\"displaytagscreen\" isdata=\"isdata\" ispermission= \"ispermission\" ng-model=\"displayTags\" add-on-space=\"true\" replace-spaces-with-dashes=\"false\" clearall=\"false\" isdisplayscreen=\"true\" isedit=\"false\" on-tag-removed=\"displayTagRemoved($tag)\" display-property=\"tagName\" placeholder=\"Add New Email\"></tags-input>"+
				"</div>"+
				"<div class=\"row margin-bottom15 manage-outline\">"+
					"<span><b>Entries Marked for Deletion ({{removeTagCount}})</b></span>"+
	  				"<tags-input type=\"deletetagscreen\" isdata=\"isdata\" ispermission=\"ispermission\" ng-model=\"deleteTags\" add-on-space=\"true\" replace-spaces-with-dashes=\"false\" clearall=\"false\" remove-tag-symbol=\"&#94\" isdisplayscreen=\"false\" isedit=\"false\" on-tag-removed=\"deleteTagRemoved($tag)\" display-property=\"tagName\" placeholder=\"Add New Email\"></tags-input>"+
	  			"</div>"+
			  	"<div class=\"row\">"+
			  		"<span><b>Entries to Add ({{newTagCount}})</b></span>"+
			  		"<div class=\"row managetags-navbar padding-top5 padding-bottom5\">"+
			  			"<div class=\"col-xs-6\" disabled=\"(submitmanagedata || !isdata || !ispermission)\" id=\"addnewtags\" ng-file-reader buttontype=\"secondary-file\" accept=\"text/csv,text/plain\" name=\"Upload CSV - Add to Existing entries\" on-readed=\"onNewTagsReaded(event,file)\" read-method=\"readMethod\" ></div>"+
			  			"<div class=\"col-xs-6 text-right margin-top5\"><a hreaf=\"#\" ng-if=\"(isdata && ispermission)\" class=\"cursor-pointer\" id=\"clearall\" ng-click=\"clearAll()\">Clear all</a></div>"+
			  		"</div>"+
		  			"<tags-input type=\"newtagscreen\" isdata=\"isdata\" ispermission= \"ispermission\" ng-if=\"name != 'recipient' && name != 'country' && name != 'sender'\" min-length=\"1\" isnewscreen=\"true\" ng-model=\"newTags\" clearall=\"true\" displaytags=\"displayTags\" on-tag-valid=\"validTag($tag)\" on-tag-in-valid=\"inValidTag($tag)\" add-on-space=\"true\" replace-spaces-with-dashes=\"false\" isdisplayscreen=\"false\" isedit=\"true\" display-property=\"tagName\" placeholder=\"Add new entry\"></tags-input>"+
		  			"<tags-input type=\"newtagscreen\" isdata=\"isdata\" ispermission= \"ispermission\" ng-if=\"name == 'country'\" min-length=\"1\" ng-model=\"newTags\" add-on-space=\"true\" isnewscreen=\"true\" clearall=\"true\" displaytags=\"displayTags\" on-tag-valid=\"validTag($tag)\" on-tag-in-valid=\"inValidTag($tag)\" replace-spaces-with-dashes=\"false\" isdisplayscreen=\"false\" isedit=\"true\" display-property=\"tagName\" placeholder=\"Add new entry\"></tags-input>"+
		  			"<tags-input type=\"newtagscreen\" isdata=\"isdata\" ispermission= \"ispermission\" ng-if=\"name == 'recipient'\" min-length=\"1\" ng-model=\"newTags\" add-on-space=\"true\" isnewscreen=\"true\" clearall=\"true\" displaytags=\"displayTags\" on-tag-valid=\"validTag($tag)\" on-tag-removed=\"newTagRemoved($tag)\" on-tag-in-valid=\"inValidTag($tag)\" replace-spaces-with-dashes=\"false\" isdisplayscreen=\"false\" isedit=\"true\" allowed-tags-pattern=\"(?:\\w|[-+.])+@{{domain_name}}\" display-property=\"tagName\" placeholder=\"Add new entry\"></tags-input>"+
		  			"<tags-input type=\"newtagscreen\" isdata=\"isdata\" ispermission= \"ispermission\" ng-if=\"name == 'sender'\" min-length=\"1\" ng-model=\"newTags\" add-on-space=\"true\" isnewscreen=\"true\" clearall=\"true\" displaytags=\"displayTags\" on-tag-valid=\"validTag($tag)\" on-tag-removed=\"newTagRemoved($tag)\" on-tag-in-valid=\"inValidTag($tag)\" replace-spaces-with-dashes=\"false\" isdisplayscreen=\"false\" isedit=\"true\" display-property=\"tagName\" placeholder=\"Add new entry\"></tags-input>"+
		  		"</div>"+
		  		"<div>"+
		  			"<p ng-if=\"name == 'reverse_domain'\" class=\"help-block\">Enter valid sending email domains (e.g. clientdomain.com).</p>"+
					"<p ng-if=\"name == 'country'\" class=\"help-block\">Enter valid originating country code Internet suffixes. (e.g. uk)</p>"+
					"<p ng-if=\"name == 'network'\" class=\"help-block\">Enter valid networks using classless notation (e.g. 192.168.1.0/24) or individual IP addresses. (e.g.  192.168.1.1)</p>"+
					"<p ng-if=\"name == 'ondemand_portalaccess_ipaddresses'\" class=\"help-block\">Enter valid networks using classless notation (e.g. 192.168.1.0/24) or individual IP addresses. (e.g.  192.168.1.1)</p>"+
					"<p ng-if=\"name == 'portalaccess_ipaddresses'\" class=\"help-block\">Enter valid networks using classless notation (e.g. 192.168.1.0/24) or individual IP addresses. (e.g.  192.168.1.1)</p>"+
					"<p ng-if=\"name == 'recipient'\" class=\"help-block\">Enter valid recipient email adddresses (e.g. client@clientdomain.com)</p>"+
					"<p ng-if=\"name == 'sender'\" class=\"help-block\">Enter valid sending email addresses (e.g. client@clientdomain.com)</p>"+
					"<p ng-if=\"name == 'sender_domain'\" class=\"help-block\">Enter sender domains (e.g. senderdomain.com). Entries starting with \".\" will be considered as a sub-domain matching value (e.g. .senderdomain.com will match subd1.senderdomain.com and subd2.senderdomain.com).</p>"+
		  		"</div>"+
		  		"<div class=\"has-error\">"+
		  			"<p class=\"help-block\" ng-show=\"managesubmittederror && (name == 'recipient' || name == 'sender')\">Invalid entries</p>"+
		  		"</div>"+
		  		"<div ng-if=\"!showtlsapplyallscreen && !showConfirmIpscreen && !showAddConfirmIpscreen\" class=\"row margin-top15\">"+
		  			"<button ng-class=\"{'disabled':(!isManageSave || !isdata || !ispermission)}\" type=\"submit\" ng-if=\"(ruletype=='9' || ((ruletype=='1' || ruletype=='2' || ruletype=='3') && name != 'recipient'))\" class=\"button primary normal\" ng-click=\"updateTags()\" id=\"savemanageupdatetags\">Save</button>"+
		  			"<button ng-class=\"{'disabled':(!isManageSave || !isdata || !ispermission)}\" type=\"submit\" ng-if=\"(ruletype!='9' && ruletype!='1' && ruletype!='2' && ruletype!='3' && name != 'recipient' && ruletype!='portalaccess' && ruletype!='ondemandportalaccess')\" class=\"button primary normal\" ng-disabled=\"submitmanagedata\" ng-click=\"updateTags()\" id=\"savemanageupdatetags\">Save</button>"+
		  			"<button ng-class=\"{'disabled':(!isManageSave || !isdata || !ispermission)}\" type=\"submit\" ng-if=\"(name == 'recipient')\" class=\"button primary normal\" ng-disabled=\"submitmanagedata\" ng-click=\"updateTags()\" id=\"savemanageupdatetags\">Save</button>"+
		  			"<button ng-class=\"{'disabled':(!isManageSave || !isdata || !ispermission)}\" type=\"submit\" ng-if=\"(ruletype == 'portalaccess')\" class=\"button primary normal\" ng-disabled=\"submitmanagedata\" ng-click=\"showPortalAccessIpconfirmscreen()\" id=\"savemanageupdatetags\">Save</button>"+
		  			"<button ng-class=\"{'disabled':(!isManageSave || !isdata || !ispermission)}\" type=\"submit\" ng-if=\"(ruletype == 'ondemandportalaccess')\" class=\"button primary normal\" ng-disabled=\"submitmanagedata\" ng-click=\"showIpconfirmscreen()\" id=\"savemanageupdatetags\">Save</button>"+
		  			"<span ng-hide=\"submitmanagedata\" class=\"margin-left10 margin-right10\">Or</span>"+
		  			"<a href=\"#\" ng-hide=\"submitmanagedata\" id=\"cancelmanageupdatetags\" ng-click=\"cancelManageTagModal()\">Cancel</a>"+
		  		"</div>"+
		  		"<div ng-if=\"showtlsapplyallscreen\" class=\"row inline-pop-box margin-minus-left20 margin-minus-right20 margin-top15\">"+
		  			"<div ng-include src=\"'tlsapplyallDocumentContent.html'\"></div>"+
				"</div>"+
				"<div ng-if=\"showConfirmIpscreen\" class=\"row inline-pop-box margin-minus-left20 margin-minus-right20 margin-top15\">"+
		  			"<div ng-include src=\"'confirmIpAddressContent.html'\"></div>"+
				"</div>"+
				"<div ng-if=\"showAddConfirmIpscreen\" class=\"row inline-pop-box margin-minus-left20 margin-minus-right20 margin-top15\">"+
	  				"<div ng-include src=\"'confirmAddIpAddressContent.html'\"></div>"+
	  			"</div>"+
		  "</div>");
}]);
