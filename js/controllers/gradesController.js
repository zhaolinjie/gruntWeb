/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var contrModule = require('js/controllers/base');
    require('js/factorys/gradeService');
    require('js/directives/pagenation');

    contrModule.registerController("GradesController",["$scope","gradesService",function($scope,gradesService){

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

        var _ = require("js/tools/lodash");

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
    }]);
})
