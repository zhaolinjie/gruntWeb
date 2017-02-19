/**
 * Created by Administrator on 2016/11/14.
 */
define(function(require,exports,module){
    var direModule = require("js/directives/base");
    var $ = require("$");
    direModule.registerDirective('richEditTools',function(){
        return{
            restrict : 'AE',
            replace:true,
            template:'<ul class="edit-tools">' +
                            '<li><input type="button" value="下划线" ng-click = "underline()"></li>' +
                            '<li><input type="button" value="粗体字" ng-click = "bold()"></li>' +
                            '<li> <input type="button" value="背景色" ng-click="bgc()"> </li>' +
                            '<li >上传图片 ' +
                                 '<form enctype="multipart/form-data">' +
                                '<input id="richTextFile" type="file" multiple="multiple" accept="image/png,image/gif,image/jpeg" class="btn-upload-file" onchange="getImgURL()">' +
                                '</form></li>'+
                        '</ul>',
            scope:{},
            link:function(scope, element, attrs){

                function getObjectURL(file) {
                    var url = null;
                    if (window.createObjectURL != undefined) { // basic
                        url = window.createObjectURL(file);
                    } else if (window.URL != undefined) { // mozilla(firefox)
                        url = window.URL.createObjectURL(file);
                    } else if (window.webkitURL != undefined) { // webkit or chrome
                        url = window.webkitURL.createObjectURL(file);
                    }
                    return url;
                }

                scope.underline = function(){
                    console.log(document.getSelection().anchorNode.data);
                    document.execCommand('Underline',false,null);
                };
                scope.bold = function(){
                    document.execCommand('bold',false,null);
                };
               scope.bgc = function(){
                   document.execCommand('BackColor',false,'#FF0000');
                    //document.execCommand('ForeColor',false,'#BBDDCC');
                };
                var richFile = document.querySelector('#richTextFile');
                var file = null;
                richFile.onchange = function(){
                    for(var i = 0;i< richFile.files.length;i++){
                        file = richFile.files[i];
                        if(file.size >= 1024 * 500){
                            alert("图片不能超过500kb");
                            return;
                        }
                        if(!/image\/\w+/.test(file.type)){
                            alert("这个需要图片！");
                            return;
                        }

                        var objUrl = getObjectURL(file) ;
                        if (objUrl) {
                            $(".text-edit .text").append('<img src =\" ' + objUrl + '\" alt = \"上传的图片\" >');
                        }
                    }

                }
            }
        }
    })
})
