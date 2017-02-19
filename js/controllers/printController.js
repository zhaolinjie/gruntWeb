/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var contModule = require('js/controllers/base');
    require('js/factorys/printService');
    contModule.registerController("printController",["$scope","printService",function($scope,printService){
        $scope.printGreadTable = function(){
            var el = document.getElementById('gradsPrintScope');
            if(el){
                printService.print( '<div>' + el.innerHTML + '</div>');
            }
        }
    }])
})