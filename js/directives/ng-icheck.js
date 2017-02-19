/**
 * Created by Administrator on 2016/10/21.
 */
define(function(require,module){
    var $ = require("../../../bower_components/jquery/dist/jquery");
    require("../../../plug/icheck/icheck");
    module.exports = angular.module("myApp.directive",[]).directive('ngIcheck', function($compile) {
    return {
        restrict : 'AE',
        require : 'ngModel',
        link : function($scope, $element, $attrs, $ngModel) {
            if (!$ngModel) {
                return;
            }
            //using iCheck
            $($element).iCheck({
                labelHover : false,
                cursor : true,
                checkboxClass : 'icheckbox_square-blue',
                radioClass : 'iradio_square-blue',
                increaseArea : '20%'
            }).on('ifClicked', function(event) {
                if ($attrs.type == "checkbox") {
                    //checkbox, $ViewValue = true/false/undefined
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
}).directive("datePicker",function(){return{
        restrict : 'AE',
        replace:false,
        scope:{
            dateConf:"=dateConfig"
        },
        link:function(scope, element, attrs){
            var conf =  scope.dateConf;
            $(element).daterangepicker({
                singleDatePicker:conf.singleDatePicker,
                timePicker: conf.timePicker,
                timePickerIncrement: conf.timePickerIncrement,
                format:conf.format,
                startDate:conf.startDate
            },function(start, end, label){
                //    do something after select date.
            });
        }
    }}).directive("myBaiduMap",function(){
        return {
            restrict : 'AE',
            replace:false,
            link:function(scope, element, attrs){
                //这里不知道我为什么回头找个人问问。为什么第一个请求不行。在link函数中dom已经生成了。
                //require("http://api.map.baidu.com/api?v=2.0&ak=XHTIYgiszMmfkMvQiA3wlrGkG8EbnQlp");
                require("http://api.map.baidu.com/getscript?v=2.0&ak=XHTIYgiszMmfkMvQiA3wlrGkG8EbnQlp&services=&t=20161110162803");
                //document.write("<script src='../defsd/sd.js'></script>")
                var map = new BMap.Map("myMap");
                var point = new BMap.Point(113.662, 34.76);
                map.centerAndZoom(point, 13);
                map.addControl(new BMap.NavigationControl());
                map.setCurrentCity("郑州市");
                scope.map = map;
            },
            controller:function($scope,$element,$log){
                $scope.search_path = function(){
                    if (!$scope.startPosition || !$scope.endPosition) {
                        return;
                    }
                    switch ($scope.travelWay) {
                        case "walking":
                        {
                            var walker = new BMap.WalkingRoute($scope.map, {
                                renderOptions: {map: $scope.map}
                            });
                            walker.search($scope.startPosition, $scope.endPosition);
                            break;
                        }
                        case "driving":
                        {
                            var driving = new BMap.DrivingRoute($scope.map, {
                                renderOptions: {
                                    map: $scope.map,
                                    autoViewport: true
                                }
                            });
                            driving.search($scope.startPosition, $scope.endPosition);
                            break;
                        }
                        default:
                        {
                            var transit = new BMap.TransitRoute($scope.map, {
                                renderOptions: {map: $scope.map}
                            });
                            transit.search($scope.startPosition, $scope.endPosition);
                        }
                    }
                }
            }
        }
    });
})