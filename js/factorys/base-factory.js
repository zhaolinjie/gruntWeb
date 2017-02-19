/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var factory = angular.module("myApp.factory",[]);
    factory.config(["$provide",function($provide){
        factory.registerService = $provide.service;
    }]);
    module.exports = factory;
})