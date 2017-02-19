/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,moudle){
    var app = require('js/controllers/base');
    require("js/factorys/login");
    app.registerController("loginController",["$scope","$rootScope","logonService","$location",function($scope,$rootScope,logonService,$location){
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
    }]);


    //module.exports = angular.module("myApp.controller",["ngRoute"]).controller("loginController",["$scope","$rootScope","logonService","$location",function($scope,$rootScope,logonService,$location){
    //    $scope.submitted = false;
    //    $scope.login = function(){
    //        if($scope.myLogin_form.$valid){
    //            logonService.getUser($scope.user.name,$scope.user.password).then(function(data){
    //                if(data){
    //                    $rootScope.logged = true;
    //                    $location.path("/total");
    //                }
    //                else{
    //                    console.log("byebye")
    //                }
    //            },function(error){
    //                console.log("can not data!");
    //            });
    //        }
    //        else{
    //            $scope.myLogin_form.submitted = true;
    //        }
    //    }
    //}]);
});