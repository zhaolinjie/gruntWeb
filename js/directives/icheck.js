/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var direModule = require("js/directives/base");
    var $ = require("$");
    require("plug/icheck/icheck");
    direModule.registerDirective('ngIcheck', function() {
        return {
            restrict : 'AE',
            require : 'ngModel',
            link : function($scope, $element, $attrs, $ngModel) {
                if (!$ngModel) {
                    return;
                }
                $($element).iCheck({
                    labelHover : false,
                    cursor : true,
                    checkboxClass: 'icheckbox_flat-red',
                    radioClass: 'iradio_flat-red',
                    increaseArea : '20%'
                }).on('ifClicked', function(event) {
                    if ($attrs.type == "checkbox") {
                        $scope.$apply(function() {
                            $ngModel.$setViewValue(!($ngModel.$modelValue == undefined ? false : $ngModel.$modelValue));
                        });
                    } else {
                        // radio, $ViewValue = $attrs.value
                        $scope.$apply(function() {
                            $ngModel.$setViewValue($attrs.value);
                        });
                    }
                });
            },
        };
    });
});