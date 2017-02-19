/**
 * Created by Administrator on 2016/10/20.
 */
define(function(require,exports,module){
    require("js/directives/ng-icheck");
    require("js/factorys/ng-factory");
    require("../../../plug/pagenation/tm.pagination");
    require("../../../plug/datePicker/daterangepicker");
module.exports = angular.module("myApp.controllers",["ngRoute","myApp.directive","myApp.factorys","ngPagination"])
    .controller("MyController",function($scope,$location){
        $scope.$on("$viewContentLoaded",function(){
            console.log("ng-view content loaded!");
        });

        $scope.$on("$routeChangeStart",function(event,next,current){
            //event.preventDefault(); //cancel url change
            console.log("route change start!");
        });

        $scope.progress = function(){
            NProgress.start();
            setTimeout(NProgress.done,3500);
        };
    })
    .controller("loginController",["$scope","$rootScope","logonService","$location",function($scope,$rootScope,logonService,$location){
        $scope.submitted = false;
        $scope.login = function(){
            if($scope.myLogin_form.$valid){
                logonService.getUser($scope.user.name,$scope.user.password).then(function(data){
                    if(data){
                        $rootScope.logged = true;
                        $location.path("/total");
                    }
                    else{
                        console.log("byebye")
                    }
                },function(error){
                    console.log("can not data!");
                });
            }
            else{
                $scope.myLogin_form.submitted = true;
            }
        }
    }])
    .controller("totleController",["$scope",function($scope){

        $scope.tot = {
            name:"jili",
            class:'yaogan',
            en:"50",
            cn:'60',
            math:'80'
        }

    }])
    .controller("icheckController",["$scope",function($scope){

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
    }])
    .controller("GradesController",["$scope","gradesService",function($scope,gradesService){

        gradesService.getRecrode().success(function(data,status,headers,config){
            pagination(data);
        }).error(function(data,status,headers,config){
            console.log("get grades with something wrong!");
        });

        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 4,
            pagesLength: 5,
            perPageOptions: [4, 8],
            onChange:function(){
                pagination();
            }
        };

        var _ = require("js/lodash");

        function pagination(studentList,size,index){
            if(!pagination.data){
                if(!_.isArray(studentList)){
                    return;
                }
                pagination.data = studentList
                $scope.paginationConf.totalItems = studentList.length;
            }

            index = $scope.paginationConf.currentPage;
            size = $scope.paginationConf.itemsPerPage;
            $scope.students = _.chunk(pagination.data,size)[--index];
        }
    }])
    .controller("printController",["$scope","printService",function($scope,printService){
        $scope.printGreadTable = function(){
            var el = document.getElementById('gradsPrintScope');
            if(el){
                printService.print( '<div>' + el.innerHTML + '</div>');
            }
        }
    }])
    .controller("mapController",function($scope){

    });
})
