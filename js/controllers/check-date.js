/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var contrModule = require('js/controllers/base');
    require('js/directives/icheck');
    require('js/directives/datePick');
    require("js/factorys/organizeService");
    require('js/directives/orgchartDirective');

    contrModule.registerController("icheckController",["$scope","$rootScope","organizeService",function($scope,$rootScope,organizeService){
            $scope.orgnizeDate = null;

            $scope.check = {
                sum:false,
                reduce:"sanduo"
            }

            $scope.dateConfig = {
                singleDatePicker: true,
                timePicker: true,
                timePickerIncrement: 30,
                format: 'YYYY-MM-DD',
                startDate:timeNow()
            }

            function timeNow(){
                var time = new Date();
                return time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDay();
            }

            organizeService.organizePerson().success(function(data,status,headers,config){
                $scope.orgnizeDate = data;
                if(!$scope.$$phase) {
                    $scope.$digest();
                }
            }).error(function(data,status,headers,config){

            })
    }]);
})