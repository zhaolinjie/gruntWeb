/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var logService = require('js/factorys/base-factory');
    logService.registerService("logonService",["$http","$q", function($http,$q){
        return {
            getUser:function(name,password){
                var defered = $q.defer();
                $http({
                    method:"GET",
                    url:"../data/user_message.json"
                }).success(function(data,status,headers,config){
                    if(data.name === name && data.password === password){
                        return defered.resolve(true);
                    }
                    return defered.resolve(false);
                }).error(function(data,status,headers,config){
                    defered.reject(data);
                })
                return defered.promise;
            },

        }
    }]);
})