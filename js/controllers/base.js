/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var app = angular.module("myApp.controllers",["ngRoute"]);
    app.config(['$controllerProvider',function($controllerProvider){
        app.registerController = $controllerProvider.register;
    }]);
    module.exports = app;
});
