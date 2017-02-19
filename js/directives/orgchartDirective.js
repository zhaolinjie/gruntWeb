/**
 * Created by Administrator on 2016/11/15.
 */
define(function(require,exports,module){
    var direModule = require("js/directives/base");
    var $ = require("$");
    require("plug/groupTree/dist/jquery.orgchart");
    direModule.registerDirective("organizeChart",function(){
        return {
            restrict: 'AE',
            replace: false,
            link: function (scope, element, attrs) {
                scope.$watch("orgnizeDate",function(newValue, oldValue){
                    if(newValue){
                        $('.chart-container').orgchart({
                            'data' : newValue,
                            'nodeContent': 'title',
                            'pan': true,
                            'zoom': true
                        });
                    }
                    else{
                        console.log("can not get person data!")
                    }
                })
            }
        }
    })
})
