/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var direModule = angular.module("myApp.directive",[]);
    direModule.config(["$compileProvider",function($compileProvider){
        direModule.registerDirective = $compileProvider.directive;
    }])
    module.exports = direModule;
})
