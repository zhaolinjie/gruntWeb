/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var logService = require('js/factorys/base-factory');
    logService.registerService("gradesService",function($http){
        return {
            getRecrode:function(){
                return $http({
                    method:"GET",
                    url:"../data/ng-data.json"
                })
            }
        }
    })
})
