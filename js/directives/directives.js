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

directives.directive('tagsInput', ["$timeout","$document","tagsInputConfig","CONSTANTS", function($timeout, $document, tagsInputConfig, CONSTANTS) {
    function TagList(options, events, displaytags) {
        var self = {}, getTagText, setTagText, tagIsValid;

        getTagText = function(tag) {
            return $._safeToString(tag[options.displayProperty]);
        };

        setTagText = function(tag, text) {
            tag[options.displayProperty] = text;
        };

        tagIsValid = function(tag) {
            var tagText = getTagText(tag);
            return tagText &&
                   tagText.length >= options.minLength &&
                   tagText.length <= options.maxLength &&
                   options.allowedTagsPattern.test(tagText);
                   //!$.etp_findInObjectArray(self.items, tag, options.displayProperty);
        };

        self.items = [];

        self.addText = function(text) {
            var tag = {'type':'new','isRemove':false,'invalid':false};
            setTagText(tag, text);
            return self.add(tag);
        };

        self.add = function(tag) {
            var tagText = getTagText(tag);

            if (options.replaceSpacesWithDashes) {
                tagText = tagText.replace(/\s/g, '-');
            }

            setTagText(tag, tagText);

            var isNewTagInDisplayTags = false;	
            /*$.each(options.displaytags,function(currentindex,currentdisplaytag){
            	if(tagText == currentdisplaytag.tagName && currentdisplaytag.isRemove != true){
  					isNewTagInDisplayTags = true;
  				}
            });*/
            
            if (tagIsValid(tag) && !isNewTagInDisplayTags) {
                self.items.push(tag);
                tag.invalid = false;
                events.trigger('tag-added', { $tag: tag, $id:options.tagInputId});
            }else if (tagText) {
            	self.items.push(tag);
            	tag.invalid = true;
                events.trigger('invalid-tag', { $tag: tag });
            }

            return tag;
        };

        self.remove = function(index) {
            var tag = self.items[index];
            if(tag.type == 'display'){
            	tag.isRemove = true;
            }else{
            	self.items.splice(index, 1)[0];
            }
            events.trigger('tag-removed', { $tag: tag , $id: options.tagInputId});
            return tag;
        };

        self.removeLast = function() {
            var tag, lastTagIndex = self.items.length - 1;

            if (options.enableEditingLastTag || self.selected) {
                self.selected = null;
                tag = self.remove(lastTagIndex);
                lastTagIndex = self.items.length - 1;
                self.selected = self.items[lastTagIndex];
            }
            else if (!self.selected) {
                self.selected = self.items[lastTagIndex];
            }

            return tag;
        };

        return self;
    }

    function validateType(type) {
        return CONSTANTS.SUPPORTED_INPUT_TYPES.indexOf(type) !== -1;
    }

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            tags: '=ngModel',
            onTagAdded: '&',
            onTagRemoved: '&',
            onTagInValid: '&',
            onTagValid: '&',
            isedit: '=isedit',
            isdata: '=?',
            ispermission: '=?',
            isdisplayscreen: '=isdisplayscreen',
            displaytags: '=',
            clearall: '=clearall',
            isnewscreen: '=isnewscreen',
            type: '@',
            tagInputId: '@'
        },
        replace: false,
        transclude: true,
        templateUrl: 'ngTagsInput/tags-input.html',
        controller: ["$scope","$attrs","$element", function($scope, $attrs, $element) {
            $scope.events = new $._SimplePubSub();
            $scope.displaytags = $scope.displaytags;
            tagsInputConfig.load('tagsInput', $scope, $attrs, {
                type: [String, 'text', validateType],
                placeholder: [String, 'Add a tag'],
                tabindex: [Number, null],
                removeTagSymbol: [String, String.fromCharCode(215)],
                replaceSpacesWithDashes: [Boolean, true],
                minLength: [Number, 3],
                maxLength: [Number, CONSTANTS.MAX_SAFE_INTEGER],
                addOnEnter: [Boolean, true],
                addOnSpace: [Boolean, false],
                addOnComma: [Boolean, true],
                addOnBlur: [Boolean, true],
                allowedTagsPattern: [RegExp, /.+/],
                enableEditingLastTag: [Boolean, false],
                minTags: [Number, 0],
                maxTags: [Number, CONSTANTS.MAX_SAFE_INTEGER],
                displayProperty: [String, 'text'],
                allowLeftoverText: [Boolean, false],
                addFromAutocompleteOnly: [Boolean, false],
                readMoreChars: [Number, 0]
            });
            $scope.options['tagInputId'] = $scope.tagInputId;
			$scope.options.displaytags = $scope.displaytags; 
            $scope.tagList = new TagList($scope.options, $scope.events);

            this.registerAutocomplete = function() {
                var input = $element.find('input');
                input.on('keydown', function(e) {
                    $scope.events.trigger('input-keydown', e);
                });

                return {
                    addTag: function(tag) {
                        return $scope.tagList.add(tag);
                    },
                    focusInput: function() {
                        input[0].focus();
                    },
                    getTags: function() {
                        return $scope.tags;
                    },
                    getCurrentTagText: function() {
                        return $scope.newTag.text;
                    },
                    getOptions: function() {
                        return $scope.options;
                    },
                    on: function(name, handler) {
                        $scope.events.on(name, handler);
                        return this;
                    }
                };
            };
        }],
        link: function(scope, element, attrs, ngModelCtrl) {
            var hotkeys = [CONSTANTS.KEYS.enter, CONSTANTS.KEYS.comma, CONSTANTS.KEYS.space, CONSTANTS.KEYS.backspace],
                tagList = scope.tagList,
                events = scope.events,
                options = scope.options,
                input = element.find('input'),
                validationOptions = ['minTags', 'maxTags', 'allowLeftoverText'],
                setElementValidity;

            setElementValidity = function() {
                ngModelCtrl.$setValidity('maxTags', scope.tags.length <= options.maxTags);
                ngModelCtrl.$setValidity('minTags', scope.tags.length >= options.minTags);
                ngModelCtrl.$setValidity('leftoverText', options.allowLeftoverText ? true : !scope.newTag.text);
            };

            events
                .on('tag-added', scope.onTagAdded)
                .on('tag-removed', scope.onTagRemoved)
                .on('tag-added', function() {
                    scope.newTag.text = '';
                })
                .on('tag-added tag-removed', function() {
                    ngModelCtrl.$setViewValue(scope.tags);
                })
                .on('invalid-tag', function() {
                    scope.newTag.invalid = true;
                    scope.newTag.text = '';
                    //scope.onTagInValid();
                })
                .on('input-change', function() {
                    tagList.selected = null;
                    scope.newTag.invalid = null;
                    //scope.onTagValid();
                })
                .on('input-focus', function() {
                    ngModelCtrl.$setValidity('leftoverText', true);
                })
                .on('input-blur', function() {
                    if (!options.addFromAutocompleteOnly) {
                        if (options.addOnBlur) {
                            tagList.addText(scope.newTag.text);
                        }
                        setElementValidity();
                    }
                })
                .on('option-change', function(e) {
                    if (validationOptions.indexOf(e.name) !== -1) {
                        setElementValidity();
                    }
                });

            scope.newTag = { text: '', invalid: null };

            scope.readMore = function (str, maxChars) {  
            	var start, end;
            	if (str.length > maxChars) {
            		start = str.substring(0, maxChars/2);
            		end = str.substring(str.length - (maxChars/2));
            		str = start + "..." + end;
            	}

            	return str;
			}

            scope.getDisplayText = function(tag, showFullText) {
            	var text = $._safeToString(tag[options.displayProperty]);
            	
            	if (options.readMoreChars > 0 && !showFullText) {
            		text = scope.readMore(text, options.readMoreChars);
            	}

                return text;
            };

            scope.isRemove = function(tag){
            	return tag['isRemove'];
            }
            
            scope.isInvalidTag = function(tag){
            	return tag['invalid'];
            }
            
            scope.isRemoveType = function(tag){
            	if(tag.type == 'remove'){
            		return true;
            	}else{
            		return false;
            	}
            }
            
            scope.isNewType = function(tag){
            	if(tag.type == 'new'){
            		return true;
            	}else{
            		return false;
            	}
            }
            
            scope.track = function(tag) {
                return tag[options.displayProperty];
            };

            scope.newTagChange = function() {
                events.trigger('input-change', scope.newTag.text);
            };

            scope.$watch('tags', function(value) {
                scope.tags = $._makeObjectArray(value, options.displayProperty);
                tagList.items = scope.tags;
            });

            scope.$watch('tags.length', function() {
                setElementValidity();
            });
            scope.allowedtonavigate = true;
            input
                .on('keydown', function(e) {
                	if(scope.allowedtonavigate){
	                	scope.allowedtonavigate = false;
	                    if (e.isImmediatePropagationStopped && e.isImmediatePropagationStopped()) {
	                        return;
	                    }
	
	                    var key = e.keyCode,
	                        isModifier = e.shiftKey || e.altKey || e.ctrlKey || e.metaKey,
	                        addKeys = {},
	                        shouldAdd, shouldRemove;
	
	                    if (isModifier || hotkeys.indexOf(key) === -1) {
	                        return;
	                    }
	
	                    addKeys[CONSTANTS.KEYS.enter] = options.addOnEnter;
	                    addKeys[CONSTANTS.KEYS.comma] = options.addOnComma;
	                    addKeys[CONSTANTS.KEYS.space] = options.addOnSpace;
	
	                    shouldAdd = !options.addFromAutocompleteOnly && addKeys[key];
	                    shouldRemove = !shouldAdd && key === CONSTANTS.KEYS.backspace && scope.newTag.text.length === 0;
	
	                    if (shouldAdd) {
	                        tagList.addText(scope.newTag.text);
	
	                        scope.$apply();
	                        e.preventDefault();
	                    }
	                    else if (shouldRemove) {
	                        var tag = tagList.removeLast();
	                        if (tag && options.enableEditingLastTag) {
	                            scope.newTag.text = tag[options.displayProperty];
	                        }
	
	                        scope.$apply();
	                        e.preventDefault();
	                    }
                	}
                }).on('keyup',function(){
                	scope.allowedtonavigate = true;
                })
                .on('focus', function() {
                    if (scope.hasFocus) {
                        return;
                    }

                    scope.hasFocus = true;
                    events.trigger('input-focus');

                    scope.$apply();
                })
                .on('blur', function() {
                    $timeout(function() {
                        var activeElement = $document.prop('activeElement'),
                            lostFocusToBrowserWindow = activeElement === input[0],
                            lostFocusToChildElement = element[0].contains(activeElement);

                        if (lostFocusToBrowserWindow || !lostFocusToChildElement) {
                            scope.hasFocus = false;
                            events.trigger('input-blur');
                        }
                    });
                });

            element.find('div').on('click', function() {
                input[0].focus();
            });
        }
    };
}]);

directives.directive('autoComplete', ["$document","$timeout","$sce","tagsInputConfig","CONSTANTS", function($document, $timeout, $sce, tagsInputConfig,CONSTANTS) {
    function SuggestionList(loadFn, options) {
        var self = {}, debouncedLoadId, getDifference, lastPromise;

        getDifference = function(array1, array2) {
            return array1.filter(function(item) {
                return !$.etp_findInObjectArray(array2, item, options.tagsInput.displayProperty);
            });
        };

        self.reset = function() {
            lastPromise = null;

            self.items = [];
            self.visible = false;
            self.index = -1;
            self.selected = null;
            self.query = null;

            $timeout.cancel(debouncedLoadId);
        };
        self.show = function() {
            self.selected = null;
            self.visible = true;
        };
        self.load = function(query, tags) {
            $timeout.cancel(debouncedLoadId);
            debouncedLoadId = $timeout(function() {
                self.query = query;

                var promise = loadFn({ $query: query });
                lastPromise = promise;

                promise.then(function(items) {
                    if (promise !== lastPromise) {
                        return;
                    }

                    items = $.etp_makeObjectArray(items.data || items, options.tagsInput.displayProperty);
                    items = getDifference(items, tags);
                    self.items = items.slice(0, options.maxResultsToShow);

                    if (self.items.length > 0) {
                        self.show();
                    }
                    else {
                        self.reset();
                    }
                });
            }, options.debounceDelay, false);
        };
        self.selectNext = function() {
            self.select(++self.index);
        };
        self.selectPrior = function() {
            self.select(--self.index);
        };
        self.select = function(index) {
            if (index < 0) {
                index = self.items.length - 1;
            }
            else if (index >= self.items.length) {
                index = 0;
            }
            self.index = index;
            self.selected = self.items[index];
        };

        self.reset();

        return self;
    }

    return {
        restrict: 'E',
        require: '^tagsInput',
        scope: { source: '&' },
        templateUrl: 'ngTagsInput/auto-complete.html',
        link: function(scope, element, attrs, tagsInputCtrl) {
            var hotkeys = [CONSTANTS.KEYS.enter, CONSTANTS.KEYS.tab, CONSTANTS.KEYS.escape, CONSTANTS.KEYS.up, CONSTANTS.KEYS.down],
                suggestionList, tagsInput, options, getItem, getDisplayText, shouldLoadSuggestions;

            tagsInputConfig.load('autoComplete', scope, attrs, {
                debounceDelay: [Number, 100],
                minLength: [Number, 3],
                highlightMatchedText: [Boolean, true],
                maxResultsToShow: [Number, 10],
                loadOnDownArrow: [Boolean, false],
                loadOnEmpty: [Boolean, false],
                loadOnFocus: [Boolean, false]
            });

            options = scope.options;

            tagsInput = tagsInputCtrl.registerAutocomplete();
            options.tagsInput = tagsInput.getOptions();

            suggestionList = new SuggestionList(scope.source, options);

            getItem = function(item) {
                return item[options.tagsInput.displayProperty];
            };

            getDisplayText = function(item) {
                return $._safeToString(getItem(item));
            };

            shouldLoadSuggestions = function(value) {
                return value && value.length >= options.minLength || !value && options.loadOnEmpty;
            };

            scope.suggestionList = suggestionList;

            scope.addSuggestionByIndex = function(index) {
                suggestionList.select(index);
                scope.addSuggestion();
            };

            scope.addSuggestion = function() {
                var added = false;
                if (suggestionList.selected) {
                    tagsInput.addTag(suggestionList.selected);
                    suggestionList.reset();
                    tagsInput.focusInput();
                    added = true;
                }
                return added;
            };

            scope.highlight = function(item) {
                var text = getDisplayText(item);
                text = $.etp_encodeHTML(text);
                if (options.highlightMatchedText) {
                    text = $.etp_replaceAll(text, $.etp_encodeHTML(suggestionList.query), '<em>$&</em>');
                }
                return $sce.trustAsHtml(text);
            };

            scope.track = function(item) {
                return getItem(item);
            };

            tagsInput
                .on('tag-added tag-removed invalid-tag input-blur', function() {
                    suggestionList.reset();
                })
                .on('input-change', function(value) {
                    if (shouldLoadSuggestions(value)) {
                        suggestionList.load(value, tagsInput.getTags());
                    }
                    else {
                        suggestionList.reset();
                    }
                })
                .on('input-focus', function() {
                    var value = tagsInput.getCurrentTagText();
                    if (options.loadOnFocus && shouldLoadSuggestions(value)) {
                        suggestionList.load(value, tagsInput.getTags());
                    }
                })
                .on('input-keydown', function(e) {
                    var immediatePropagationStopped = false;
                    e.stopImmediatePropagation = function() {
                        immediatePropagationStopped = true;
                        e.stopPropagation();
                    };
                    e.isImmediatePropagationStopped = function() {
                        return immediatePropagationStopped;
                    };

                    var key = e.keyCode,
                        handled = false;

                    if (hotkeys.indexOf(key) === -1) {
                        return;
                    }

                    if (suggestionList.visible) {

                        if (key === CONSTANTS.KEYS.down) {
                            suggestionList.selectNext();
                            handled = true;
                        }
                        else if (key === CONSTANTS.KEYS.up) {
                            suggestionList.selectPrior();
                            handled = true;
                        }
                        else if (key === CONSTANTS.KEYS.escape) {
                            suggestionList.reset();
                            handled = true;
                        }
                        else if (key === CONSTANTS.KEYS.enter || key === CONSTANTS.KEYS.tab) {
                            handled = scope.addSuggestion();
                        }
                    }
                    else {
                        if (key === CONSTANTS.KEYS.down && scope.options.loadOnDownArrow) {
                            suggestionList.load(tagsInput.getCurrentTagText(), tagsInput.getTags());
                            handled = true;
                        }
                    }

                    if (handled) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        scope.$apply();
                    }
                });
        }
    };
}]);


directives.directive('tiTranscludeAppend', function() {
    return function(scope, element, attrs, ctrl, transcludeFn) {
        transcludeFn(function(clone) {
            element.append(clone);
        });
    };
});


directives.directive('tiAutosize', ["tagsInputConfig", function(tagsInputConfig) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var threshold = tagsInputConfig.getTextAutosizeThreshold(),
                span, resize;

            span = angular.element('<span class="input"></span>');
            span.css('display', 'none')
                .css('visibility', 'hidden')
                .css('width', 'auto')
                .css('white-space', 'pre');

            element.parent().append(span);

            resize = function(originalValue) {
                var value = originalValue, width;

                if (angular.isString(value) && value.length === 0) {
                    value = attrs.placeholder;
                }

                if (value) {
                    span.text(value);
                    span.css('display', '');
                    width = span.prop('offsetWidth');
                    span.css('display', 'none');
                }

                element.css('width', width ? width + threshold + 'px' : '');

                return originalValue;
            };

            ctrl.$parsers.unshift(resize);
            ctrl.$formatters.unshift(resize);

            attrs.$observe('placeholder', function(value) {
                if (!ctrl.$modelValue) {
                    resize(value);
                }
            });
        }
    };
}]);

directives.directive('tiBindAttrs', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.tiBindAttrs, function(value) {
            angular.forEach(value, function(value, key) {
                attrs.$set(key, value);
            });
        }, true);
    };
});


directives.provider('tagsInputConfig', function() {
    var globalDefaults = {},
        interpolationStatus = {},
        autosizeThreshold = 3;

    this.setDefaults = function(directive, defaults) {
        globalDefaults[directive] = defaults;
        return this;
    };

   
    this.setActiveInterpolation = function(directive, options) {
        interpolationStatus[directive] = options;
        return this;
    };

    this.setTextAutosizeThreshold = function(threshold) {
        autosizeThreshold = threshold;
        return this;
    };

    this.$get = ["$interpolate", function($interpolate) {
        var converters = {};
        converters[String] = function(value) { return value; };
        converters[Number] = function(value) { return parseInt(value, 10); };
        converters[Boolean] = function(value) { return value.toLowerCase() === 'true'; };
        converters[RegExp] = function(value) { return new RegExp(value,'i'); };

        return {
            load: function(directive, scope, attrs, options) {
                var defaultValidator = function() { return true; };

                scope.options = {};

                angular.forEach(options, function(value, key) {
                    var type, localDefault, validator, converter, getDefault, updateValue;

                    type = value[0];
                    localDefault = value[1];
                    validator = value[2] || defaultValidator;
                    converter = converters[type];

                    getDefault = function() {
                        var globalValue = globalDefaults[directive] && globalDefaults[directive][key];
                        return angular.isDefined(globalValue) ? globalValue : localDefault;
                    };

                    updateValue = function(value) {
                        scope.options[key] = value && validator(value) ? converter(value) : getDefault();
                    };

                    if (interpolationStatus[directive] && interpolationStatus[directive][key]) {
                        attrs.$observe(key, function(value) {
                            updateValue(value);
                            scope.events.trigger('option-change', { name: key, newValue: value });
                        });
                    }
                    else {
                        updateValue(attrs[key] && $interpolate(attrs[key])(scope.$parent));
                    }
                });
            },
            getTextAutosizeThreshold: function() {
                return autosizeThreshold;
            }
        };
    }];
});


directives.directive( "ngFileReader", function(){
    var parseParams_ = function( attrs ){
    	return {
    		multiple:attrs.multiple != undefined
    	}
    }
    var init_ = function( $elem, inputParams ){
    	var $input = $elem.find( "input" );
    	if(inputParams.multiple){
    		$input.attr( 'multiple', true );
    	}
    }

    var events = {
    	onSelected:function( scope, files ){
    		scope.onSelected( {files:files} );
    	},
    	
    	onReadered:function( scope, files ){
	        angular.forEach( files, function( file ){
	        	var readMethod = scope.readMethod;
	        	if(readMethod){
	        		var fileReader = new FileReader();
	        		fileReader.addEventListener( 'loadend', function( e ){
	        			scope.onReaded( {event:e,file:file} );
	        			scope.$apply();
	        		});
	        		fileReader[ readMethod ] && fileReader[ readMethod ]( file, scope.readEncoding );
	        	}
	        });
    	}
    }

    return {
      scope:{
        onSelected:"&",
        onReaded:"&",
        readMethod:"=",
        readEncoding:"=",
        accept:"@",
        filereader:"@",
        name:"@",
        buttontype:"@",
        disabled: '=disabled',
        id:"@"
      },
      template:"<span ng-disabled=\"disabled\" ng-show=\"isFileReader\" ng-class=\"{'primary':(buttontype=='primary'),'secondary':(buttontype=='secondary'),'secondary-file':(buttontype=='secondary-file')}\" class=\"btn button small btn-sm btn-file\">{{name}}<input type=\"file\" id=\"{{id}}\" accept=\"{{accept}}\"/></span>",
      link:function( scope, $elem, attrs ){
    	  if(window.FileReader){
				scope.isFileReader = true;
			}else{
				scope.isFileReader = false;
		  }
    	  var inputParams = parseParams_( attrs );
    	  if(window.File == undefined){
    		  var position = $elem.css('position'),
    		  initParams = {
    			  multiple:inputParams.multiple,
    			  debugMode:attrs.debugMode,
    			  filereader:scope.filereader,
    		  };
    		  if ( position == "" || position == "static" ) {
	            $elem.css( "position", "relative" );
	            $.extend( initParams,{
	              appendTo:$elem,
	              position:"absolute",
	              offsetCss:function(){
	                return {left:0,top:0};
	              }
	            });
	          }
    		  $elem.fileReader( initParams );
    	  }else{
	          init_( $elem, inputParams );
	          var ignoreDrag = function( e ){
	            e.preventDefault();
	          };
	          $elem.on( "dragenter", ignoreDrag );
	          $elem.on( "dragover", ignoreDrag );
	          $elem.on( "drop", function( e ){
	              ignoreDrag( e );
	              var originalEvent = e.originalEvent ? e.originalEvent : e,
	              files = originalEvent.dataTransfer.files;
	              events.onSelected( scope, files );
	              events.onReadered( scope, files );
	          });
        }

        $elem.on( 'change', function( evt ){
          var files = evt.target.files;
          events.onSelected( scope, files );
          events.onReadered( scope, files );
          $elem.find("input").val('');
          scope.$apply();
        });
      }
    };
});





