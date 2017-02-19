/**
 * Created by Administrator on 2016/11/17.
 */

function EnumImgLegend(element,options){
    if(!options.pics) throw "你需要几张图片";
    if(options.pics.length < 0) throw "你需要几张图片";
    var EnumImgLegend = function(){throw "不能实例化图片类"};

    var duration = options.duration;
    //设置每步运行多少
    var step = {};

    //记录单位
    var untis = {};

    //记录元素运行的最终状态
    var endState = {};

    //元素的开始,结束状态。
    var eleState = {'right':-205,'transform':59 };
    var targetState = {"right":"745px", "transform":"rotateY(-59deg)"};

    //标志是否继续滚动
    EnumImgLegend.ISMOVE = true;

    //判断有没有被实例化
    EnumImgLegend.INSTANTIATE = false;

    //存储所有的图片对象
    EnumImgLegend.values = [];

    //存储所有运行图片对象
    EnumImgLegend.onmove = [];

    //这里定义移动图片出现的个数
    //这是一个常量。
    EnumImgLegend.MOVEPIC = 10;

    //定义是否添加元素的比较对象；
    EnumImgLegend.THRESHOULD = (function(){
        var wd = element.css("width").match(/\d+/g)[0];
        if(!isNaN(wd)){
            return parseInt(wd/EnumImgLegend.MOVEPIC);
        }
        return 0;
    })();

    if(!EnumImgLegend.THRESHOULD) throw "容器宽度不能为0";

    //这里的59，和-199，需要处理。
    // 由于“视距”和“容器宽度”和这个两个值之间的函数关系我不会。
    //如果能把这个函数关系解决掉，这里就不会写死，
    //也就是这个四维矩阵,图像旋转就是坐标轴变换。
    //  X 0 0 0
    //  0 Y 0 0
    //  0 0 Z 0
    //  0 0 0 1
    EnumImgLegend.prototype = {
        constructor: EnumImgLegend,
        transform:59,
        right:-199,
        value:null,
        name:null,
        isAdded:false,
        reset:function() {
            this.transform = 59;
            this.right = -199;
            this.isAdded = false;
            this.value.css({'transform': 'rotateY(59deg)', 'right': '-205px'})
        }
    }

    EnumImgLegend.create = function(imgUri){
        var div = document.createElement("div");
        var li = document.createElement("li");
        var canvas = document.createElement("canvas");
        $(li).appendTo($('.myCarousel'));

        $(div).on('click',function(event){
            if(EnumImgLegend.ISMOVE){
                EnumImgLegend.ISMOVE = false;
            }else{
                EnumImgLegend.ISMOVE = true;
                EnumImgLegend.animal();
            }
        }).css({
            'width':'200px',
            'height':'200px',
            'background-image':'url(' + imgUri + ')'
        }).appendTo(li);

        var num = Math.floor(Math.random()*10+1);
        var img = null;
        if(num%3 ==0){
            img = 'url(css/img/prize.jpg)'
        }else{
            img = 'url(css/img/thanks.jpg)'
        }
        $(canvas).attr({
            'width':'200',
            'height':'100'
        }).css({
            'background-image':img
        }).appendTo(li);

        return  $(li).addClass("cl-img");
    };

    EnumImgLegend.isMiddle = function(element){
        if(!EnumImgLegend.ISMOVE && Math.abs(element['transform']) < 1){
            clearInterval(EnumImgLegend.cirly);
        }
    };

    EnumImgLegend.paint = function(cav){
        var canvas = $(cav);
        var downFlag = false;
        canvas.mousedown(function(event){
            //event.stopPropagation();
            downFlag = true;
        });
        canvas.on('mousemove',function(event){
            //event.stopPropagation();
            if(downFlag && !EnumImgLegend.ISMOVE){
                var x = event.clientX - $(this).offset().left;
                var y = event.clientY - ($(this).offset().top - $("body").scrollTop());
                var ctx=canvas.get(0).getContext('2d');
                //ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(x,y,10,0,2*Math.PI);
                ctx.fill();
            }
        });
        canvas.on('mouseup',function(event){
            //event.stopPropagation();
            downFlag = false;
            var ctx=canvas.get(0).getContext('2d');
            var imgData=ctx.getImageData(0,0,200,100);
            var tatol = imgData.data.length/4;
            var showpx = 0;
            for(var i=0;i<tatol;i++){
                if(imgData.data[i] < 100) showpx++;
            }
            if(showpx/tatol > 0.5) ctx.fillRect(0,0,200,100);

        });
        canvas.on('mouseleave',function(event){
            //event.stopPropagation();
            downFlag = false;
        });
    };

    EnumImgLegend.isStop = function(el){
        if(!el){
           throw "这不是一个元素"
        }
        for(var k in endState){
            if(Number(eleState[k]) <= Number(endState[k]) && Number(el[k]) <= Number(endState[k])){
                return false
            }
            if(Number(eleState[k]) > Number(endState[k]) && Number(el[k]) > Number(endState[k])){
                return false
            }
            return true;
        }
    }

    //是否添加下一个元素到旋转数组中
    //判断依据：这个元素是否运动到一定位置
    //这里应该尽量运行少的代码。应该把它比较的对象先初始化好。
    //H这里先用大于定义其实有逻辑问题，这样插件可扩展性太差。
    EnumImgLegend.isAdd = function(el){
        if( Number(el.right) > EnumImgLegend.THRESHOULD){
            el.isAdded = true;
            return true;
        }
        return false;
    }


    //不用去取元素状态了
    //EnumImgLegend.eleAttrVal = function(ele,att){
    //    //娶过来的矩阵不会转换。
    //    if(att == "transform"){
    //        return 59;
    //    }
    //    var prop = ele.css(att);
    //    prop = $.isArray(prop) ? prop[0] : prop;
    //
    //    if(prop){
    //        return Number(prop.match(/\-?\d+/g)[0]);
    //    }
    //    else
    //        return 0;
    //}

    EnumImgLegend.addStep = function(el){
        for(var key in step){
            el[key] = (Number(el[key]) + Number(step[key])).toFixed(2);
        }
        return el;
    }

    EnumImgLegend.addUnits = function(el){
        var printStyle = {};
        for(var key in targetState){
            if(untis[key].length > 1){
                printStyle[key] = untis[key][0] + "(" + el[key] + untis[key][1] +")"
                break;
            }
            printStyle[key] =el[key] + untis[key][0];
        }
        return printStyle;
    }

    EnumImgLegend.makeCanvas = function(canvas){
        var ctx=canvas.getContext('2d');
        ctx.fillStyle='#666666';
        ctx.fillRect(0,0,200,100);
        ctx.globalCompositeOperation = 'destination-out';
    };

    EnumImgLegend.init = function(){
        if(isNaN(duration)){
            throw "you mast input animale run time!";
        }
        duration = duration*1000/40;

        for(var key in targetState){
            endState[key] = targetState[key].toString().match(/\-?\d+/g)[0];
            untis[key]= targetState[key].toString().match(/[a-zA-Z]+/g);
            step[key] = ((endState[key] - eleState[key])/duration).toFixed(2);
        }

        for(var i = 0;i<options.pics.length;i++){
            var e = inherit(EnumImgLegend.prototype);
            //这里返回一个jquery对象
            e.value = EnumImgLegend.create(options.pics[i]);
            e.name = "pic" + i;
            EnumImgLegend.values.push(e);
            var canvas = e.value.find('canvas').get(0);
            this.makeCanvas(canvas);
            this.paint(canvas);
        }

        //向移动队列注入一个元素
        EnumImgLegend.add();
    }

    //将第一个图片对象放到运行数组中；shift:去掉，脱掉的意思。
    EnumImgLegend.add = function(){
        EnumImgLegend.onmove.push(EnumImgLegend.values.shift());
    };

    //将移动后的元素取出，重置后放到原来的数组。
    EnumImgLegend.remove = function(){
        var eleShift = EnumImgLegend.onmove.shift();
        eleShift.reset();
        EnumImgLegend.values.push(eleShift);
    };

    //这里不穿参数只要是onmove数组中的元素都要执行移动。
    //这里面有一个问题，假如在40ms内，for函数没有执行玩，该怎么办呢?
    EnumImgLegend.animal = function(){
        var moveList = EnumImgLegend.onmove;
        if(EnumImgLegend.cirly){
            clearTimeout(EnumImgLegend.cirly);
        }
        EnumImgLegend.cirly = setInterval(function(){
            for(var i=0;i < moveList.length; i++){
                if(EnumImgLegend.isStop(moveList[i])){
                    //将数组第一项
                    EnumImgLegend.remove();
                }
                if(!moveList[i].isAdded && EnumImgLegend.isAdd(moveList[i])){
                    //添加一向进来
                    EnumImgLegend.add();
                }
                EnumImgLegend.isMiddle(moveList[i]);
                EnumImgLegend.addStep(moveList[i]);
                moveList[i].value.css(EnumImgLegend.addUnits(moveList[i]));
            }
            //setTimeout(arguments.callee,20);
        },20);
    }

    EnumImgLegend.foreach = function(f,c){
        for(var i=0;i<this.values.length;i++){
            f.call(c,this.values[i]);
        }
    }


    function scrollScreen(){
        var eleHeight = element.height();
        var screenHeight = $(window).height();
        var offsetHeight = element.offset().top;
        return offsetHeight -(screenHeight - eleHeight);
    }

    var carScrollTop = scrollScreen();


    $(window).scroll(function(){
        if($(window).scrollTop() >= carScrollTop){
            if(!EnumImgLegend.INSTANTIATE){
                EnumImgLegend.INSTANTIATE = true;
                EnumImgLegend.init();
                EnumImgLegend.animal();
            }
        }
    })
}

;(function($) {
    $.fn.extend({
        EnumImgLegend: function(options) {
            return this.each(function() {
                return new EnumImgLegend($(this),options);
            });
        }
    });
})(jQuery|| window.jQuery);





