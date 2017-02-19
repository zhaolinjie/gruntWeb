/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module){
    var direModule = require("js/directives/base");
    var $ = require('$');
    require('plug/datePicker/daterangepicker');
    direModule.registerDirective("datePicker",function(){return{
        restrict : 'AE',
        replace:false,
        scope:{
            dateConf:"=dateConfig"
        },
        link:function(scope, element, attrs){
            var conf =  scope.dateConf;
            $(element).daterangepicker({
                singleDatePicker:conf.singleDatePicker,
                timePicker: conf.timePicker,
                timePickerIncrement: conf.timePickerIncrement,
                format:conf.format,
                startDate:conf.startDate
            },function(start, end, label){
                //    do something after select date.
            });
        }
    }});
})