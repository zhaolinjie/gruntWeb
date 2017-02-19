/**
 * Created by Administrator on 2016/11/15.
 */
define(function(require,exports,module){
    var logService = require('js/factorys/base-factory');
    logService.registerService("organizeService",function($http){
        return {
            organizePerson:function(){
                return $http({
                    method:"GET",
                    url:"../data/orcTree.json"
                })
            }
        }
    })
})