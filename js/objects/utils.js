/*
 * jQuery Specific code
 * */

(function($) {
    $._SimplePubSub = function() {
        var events = {};
        return {
            on: function(names, handler) {
                names.split(' ').forEach(function(name) {
                    if (!events[name]) {
                        events[name] = [];
                    }
                    events[name].push(handler);
                });
                return this;
            },
            trigger: function(name, args) {
                angular.forEach(events[name], function(handler) {
                    handler.call(null, args);
                });
                return this;
            }
        };
    }
    $._makeObjectArray = function(array, key) {
        array = array || [];
        if (array.length > 0 && !angular.isObject(array[0])) {
            array.forEach(function(item, index) {
                array[index] = {};
                array[index][key] = item;
            });
        }
        return array;
    }


    $._replaceAll = function(str, substr, newSubstr) {
        if (!substr) {
            return str;
        }

        var expression = substr.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        return str.replace(new RegExp(expression, 'gi'), newSubstr);
    }

    $._safeToString = function(value) {
        return angular.isUndefined(value) || value == null ? '' : value.toString().trim();
    }

    $._findInObjectArray = function(array, obj, key) {
        var item = null;
        for (var i = 0; i < array.length; i++) {
            if ($.etp_safeToString(array[i][key]).toLowerCase() === $.etp_safeToString(obj[key]).toLowerCase()) {
                item = array[i];
                break;
            }
        }
        return item;
    }

})(jQuery);