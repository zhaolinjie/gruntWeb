/**
 * Created by Administrator on 2016/11/12.
 */
    define(function(require,exports,module){
        var logService = require('js/factorys/base-factory');
        logService.registerService('printService',function(){
            function addStyles(doc,printStyle){
                var styleElt,styleSheet;
                if(doc.createStyleSheet){
                    styleSheet = doc.createStyleSheet();
                }
                else{
                    var head = doc.getElementsByTagName("head")[0];
                    styleElt = doc.createElement("style");
                    head.appendChild(styleElt);
                    styleSheet = doc.styleSheets[doc.styleSheets.length - 1];
                }
                if(typeof printStyle === "string"){
                    if(styleElt) styleElt.innerHTML = printStyle;
                    else styleSheet.cssText = printStyle;
                }
                else{
                    var i = 0;
                    for(selector in  printStyle){
                        if(styleSheet.insertRule){
                            var rule = selector + "{" +styleSheet[selector] + "}";
                            styleSheet.insertRule(rule,i++);
                        }
                        else{
                            styleSheet.addRule(selector,styleSheet[selector],i++);
                        }
                    }
                }
            }

            var printStyle = "@media print {" +
                "body{background-color: red;}"+
                "table{width:100%;border-left:0.1cm solid black;border-top:0.1cm solid black;border-spacing:0;text-align:center;}"+
                "table td{border-right:0.1cm solid black;border-bottom:0.1cm solid black;}" +
                "table tr{height:0.9cm}" +
                "h1 {  page-break-before: always;  }"+
                " @page {  size: A4 landscape;  }"+
                " @page:right{  @bottom-left {  margin: 10pt 0 30pt 0;  border-top: .25pt solid #666;  content: \"My book\";  font-size: 9pt;  color: #333;  }  }"   +
                " @page :left {  margin-left: 3cm;  }" +
                " @page :blank {@top-center { content: \"This page is intentionally left blank.\" }}" +
                "｝";

            return{
                print:function(printNode){
                    var iframe = document.getElementById("print_table_grades");
                    var doc = null;
                    if(iframe){
                        document.body.removeChild(iframe);
                    }
                    iframe = document.createElement('IFRAME');
                    iframe.setAttribute('style','width:400px;height:300px;position:absolute;top:100px;left:5px;');
                    iframe.setAttribute("id","print_table_grades");

                    document.body.appendChild(iframe);
                    doc = iframe.contentWindow.document;
                    doc.open();
                    //注意下面这两个函数的顺序不能颠倒，当向文档中写的时候会自动创建head，
                    doc.write(printNode);
                    addStyles(doc,printStyle);
                    doc.close();
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                    document.body.removeChild(iframe);
                }
            }
        })
    })