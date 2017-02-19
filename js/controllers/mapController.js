/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){

    var contrModule = require('js/controllers/base')
    require('js/directives/mapDirective');
    //这个controller有点意思，和link函数共享数据。
    contrModule.registerController('mapController',function($scope){
        $scope.search_path = function(){
            if (!$scope.startPosition || !$scope.endPosition) {
                return;
            }
            switch ($scope.travelWay) {
                case "walking":
                {
                    var walker = new BMap.WalkingRoute($scope.map, {
                        renderOptions: {map: $scope.map}
                    });
                    walker.search($scope.startPosition, $scope.endPosition);
                    break;
                }
                case "driving":
                {
                    var driving = new BMap.DrivingRoute($scope.map, {
                        renderOptions: {
                            map: $scope.map,
                            autoViewport: true
                        }
                    });
                    driving.search($scope.startPosition, $scope.endPosition);
                    break;
                }
                default:
                {
                    var transit = new BMap.TransitRoute($scope.map, {
                        renderOptions: {map: $scope.map}
                    });
                    transit.search($scope.startPosition, $scope.endPosition);
                }
            }
        }
    })

})