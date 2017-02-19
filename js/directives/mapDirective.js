/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var direModule = require("js/directives/base");
    direModule.registerDirective("myBaiduMap",function(){
        return {
            restrict : 'AE',
            replace:false,
            link:function(scope, element, attrs){
                //这里不知道我为什么回头找个人问问。为什么第一个请求不行。在link函数中dom已经生成了。
                //require("http://api.map.baidu.com/api?v=2.0&ak=XHTIYgiszMmfkMvQiA3wlrGkG8EbnQlp");
                require("https://api.map.baidu.com/getscript?v=2.0&ak=XHTIYgiszMmfkMvQiA3wlrGkG8EbnQlp&services=&t=20161110162803");
                //document.write("<script src='../defsd/sd.js'></script>")
                var map = new BMap.Map("myMap");
                var point = new BMap.Point(113.662, 34.76);
                map.centerAndZoom(point, 13);
                map.addControl(new BMap.NavigationControl());
                map.setCurrentCity("郑州市");
                scope.map = map;
            }
            //controller:function($scope,$element,$log){
            //
            //}
        }
    });
})
