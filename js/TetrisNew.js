/**
 * Created by Administrator on 2016/11/20.
 */

;function Tetris(element){

    //定义谢谢常量用来控制网格大小这里建立一个10 * 20的
    //小方块默认宽度为20px。
    Tetris.SQUARE = 20;
    Tetris.WIDTH = Tetris.SQUARE * 10;
    Tetris.HEIGHT = Tetris.SQUARE * 20;
    Tetris.MOVETIME = 500;


    Tetris.GridArray = [];
    Tetris.column = [];

    //初始化框里的方格并且储存到数组grid中
    //grid数组用来记录网格的数量和位置
    Tetris.init = function(){
        for(var i = 0 ;i< 20;i++){
            Tetris.column[i] = 0;
            Tetris.GridArray[i] = [];
            for(var j = 0; j < 10;j++){
                var div = document.createElement('div');
                $(div).addClass('grid');
                element.append(div);
                Tetris.GridArray[i][j] = $(div);
                Tetris.GridArray[i][j].isActive = false;
            }
        }
    }

    //将这个方块设置为活动状态
    Tetris.setActive = function(elemnt){
        elemnt.css({'background-color':'blue','border-color':'red'})
    }

    //将这个方块设定为原始状态
    Tetris.setCommon = function(element){
        element.css({'background-color':'transparent','border-color':'gray'})
    }


    //如果某一行满了清除某一行
    Tetris.clearRow = function(rowIndex){
        for(var i=0;i<10;i++){
            Tetris["col" + i] -= 1;
        }
        setTimeout(function(){
        },100)
    }


    //根据位置计算方格绝对位置
    //Tetris.gridPosition = function(x,y){
    //
    //}

    //建立一个虚类型用来存储15种不同的形状的母类型
    function Drop(){throw "下落方块虚类"}
    Drop.prototype = {
        constructor:Drop,
        moveLeft:function(){
            var that = this;
            if(this.left > 0){
                this.left -= 1;
                this.setDrop(this.left,this.top,this.width,this.height);
                this.clearRight(this.left,this.top,this.width,this.height);
                clearTimeout(window.tetrisTime);
                window.tetrisTime = setTimeout(function(){
                    that.moveDown();
                },500);
            }
        },
        moveRight:function(){
            var that = this;
            if(this.left < 10 - this.width){
                this.left += 1;
                this.setDrop(this.left,this.top,this.width,this.height);
                this.clearLeft(this.left,this.top,this.width,this.height);
                clearTimeout(window.tetrisTime);
                window.tetrisTime = setTimeout(function(){
                    that.moveDown();
                },500);
            }
        },
        moveDown:function(){
            var that = this;
            if(Tetris.column[this.left] + this.height*Tetris.SQUARE < Tetris.HEIGHT){
                this.top += 1;
                this.setDrop(this.left,this.top,this.width,this.height);
                this.clearTop();
            }
            clearTimeout(window.tetrisTime);
            window.tetrisTime = setTimeout(function(){
                that.isBottom();
            },Tetris.MOVETIME);
        },
        setDrop:function(left,top,width,height){
            for(var i= top;i < top + height;i++){
                if(i  < 0 ) continue;
                if(i>=20) throw "竖直方向参数运行错误"
                //这里将left减去1给出显示模型的位置。
                for(var j = left ;j< left + width;j++){
                    if(j < 0|| j > 10){
                        continue;
                    }
                    var ele = Tetris.GridArray[i][j];
                    if(ele){
                        if(this.shepModule[i-top][j-left]){
                            Tetris.setActive(ele);
                        }
                    }
                }
            }
        }
    }

    //下面分别定义各种下落模块的模版
    //定义长条类
    var DropLong = Drop.extend(function(left,top,width,height){
        this.top = top;
        this.left = left;
        this.height = height;
        this.width = width;
        this.shepModule = [];
        for(var i = 0;i< 4;i++){
            this.shepModule[i] = [];
            for(var j=0;j< 1;j++){
                this.shepModule[i][j] = true;
            }
        }
    },{
        isBottom:function(){
            clearTimeout(window.tetrisTime)
            if(Tetris.column[this.left]*Tetris.SQUARE  + this.height*Tetris.SQUARE + this.top *Tetris.SQUARE >=  Tetris.HEIGHT){
                this.moveDone();
            }
            else{
                this.moveDown()
            }
        },
        moveDone:function(){
            //for(var i=this.top;i<this.top+this.height;i++){
            //    for(var j= this.left;j<this.left + this.width;j++){
            //        Tetris.GridArray[i][j].isActive = true;
            //    }
            //}
            if(this.top<0){
                alert("你已经输了！");
                return;
            }
            Tetris.column[this.left] += this.height;
            this.left = 4;
            this.top = -5;
            Drop.random();
        },
        clearTop:function(){
            if(this.top > 0){
                var element = Tetris.GridArray[this.top -1][this.left];
                if(element){
                    Tetris.setCommon(element);
                }
            }
        },
        clearLeft:function(left,top,width,height){
            for(var i= top;i < top + height;i++){
                if(i  < 0) continue;
                if(i>20) throw "竖直方向参数运行错误"
                //这里将left减去1给出显示模型的位置。
                for(var j = left ;j< left + width;j++) {
                    var element = Tetris.GridArray[i][j-1];
                    if(element){
                        Tetris.setCommon(element);
                    }
                }
            }
        },
        clearRight:function(left,top,width,height){
            for(var i= top;i < top + height;i++){
                if(i  < 0) continue;
                if(i>20) throw "竖直方向参数运行错误"
                //这里将left减去1给出显示模型的位置。
                for(var j = left ;j< left + width;j++) {
                    var element = Tetris.GridArray[i][j+1];
                    if(element){
                        Tetris.setCommon(element);
                    }
                }
            }
        }
    });

    //定义横向长条
    var DropEven = Drop.extend(function(left,top,width,height){
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.shepModule = [];
        for(var i=0;i<height;i++){
            this.shepModule[i] = [];
            for(var j=0;j<width;j++){
                this.shepModule[i][j] = true;
            }
        }
    },{
        isBottom:function(){
            clearTimeout(window.tetrisTime);
            var bottom = false;
            for(var i=this.left;i<this.left + this.width;i++){
                if(Tetris.column[i]*Tetris.SQUARE  + this.height*Tetris.SQUARE + this.top *Tetris.SQUARE >=  Tetris.HEIGHT){
                    bottom = true;
                    break;
                }
            }
            if(bottom){
                this.moveDone();
            }
            else{
                this.moveDown();
            }
        },
        moveDone:function(){
            if(this.top<0){
                alert("你已经输了！");
                return;
            }
            for(var i = this.left ;i< this.left + this.width;i++){
                //console.log(i+':'+(20-this.top));
                Tetris.column[i] = 20 - this.top;
            }
            this.top = -1;
            this.left = 3;
            Drop.random();
        },
        clearTop:function(){
            if(this.top > 0){
                for(var i = this.left ;i< this.left + this.width;i++){
                    var element = Tetris.GridArray[this.top -1][i];
                    if(element){
                        Tetris.setCommon(element);
                    }
                }
            }
        },
        clearLeft:function(left,top,width,height){
            if(top>=0){
                var element = Tetris.GridArray[top][left-1];
                if(element){
                    Tetris.setCommon(element);
                }
            }
        },
        clearRight:function(left,top,width,height){
            if(top>=0){
                var element = Tetris.GridArray[top][left + width];
                if(element){
                    Tetris.setCommon(element);
                }
            }
        }
    });

    //定义正方形
    var DropSquare = Drop.extend(function(left,top,width,height){
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.shepModule = [];
        for(var i=0;i<2;i++){
            this.shepModule[i] = [];
            for(var j=0;j<2;j++){
                    this.shepModule[i][j] = true;
            }
        }
    },{
        isBottom:function(){
            clearTimeout(window.tetrisTime);
            var bottom = false;
            for(var i=this.left;i<this.left + this.width;i++){
                if(Tetris.column[i]*Tetris.SQUARE  + this.height*Tetris.SQUARE + this.top *Tetris.SQUARE >=  Tetris.HEIGHT){
                    bottom = true;
                    break;
                }
            }
            if(bottom){
                this.moveDone();
            }
            else{
                this.moveDown();
            }
        },
        moveDone:function(){
            if(this.top<0){
                alert("你已经输了！");
                return;
            }
            for(var i = this.left ;i< this.left + this.width;i++){
                //console.log(i+':'+(20-this.top));
                Tetris.column[i] = 20 - this.top;
            }
            this.top = -1;
            this.left = 3;
            Drop.random();
        },
        clearTop:function(){
            if(this.top > 0){
                for(var i = this.left ;i< this.left + this.width;i++){
                    var element = Tetris.GridArray[this.top -1][i];
                    if(element){
                        Tetris.setCommon(element);
                    }
                }
            }
        },
        clearLeft:function(left,top,width,height){
            for(var i=top;i< top + height; i++){
                if(i >= 0){
                    var element = Tetris.GridArray[i][left-1];
                    if(element){
                        Tetris.setCommon(element);
                    }
                }
            }
        },
        clearRight:function(left,top,width,height){
            for(var i=top;i< top + height; i++){
                if(i >= 0){
                    var element = Tetris.GridArray[i][left + width];
                    if(element){
                        Tetris.setCommon(element);
                    }
                }
            }
        }
    });

    //定义T形
    var DropTDown = Drop.extend(function(left,top,width,height){
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.shepModule = [];
        for(var i=0;i<height;i++){
            this.shepModule[i] = [];
            for(var j=0;j<width;j++){
                if(j == 1 || i == 0){
                    this.shepModule[i][j] = true;
                    continue;
                }
                this.shepModule[i][j] = false;
            }
        }
    },{
        isBottom:function(){
            clearTimeout(window.tetrisTime);
            var bottom = false,height;
            for(var i=this.left;i<this.left+this.width;i++){
                if(i==this.left +1){
                    height = this.height;
                }
                else{
                    height = this.height - 1;
                }
                if(Tetris.column[i]*Tetris.SQUARE  + height*Tetris.SQUARE + this.top *Tetris.SQUARE >=  Tetris.HEIGHT){
                    bottom = true;
                    break;
                }
            }
            if(bottom){
                this.moveDone();
            }else{
                this.moveDown();
            }

        },
        moveDone:function(){
            if(this.top<0){
                alert("你已经输了！");
                return;
            }
            for(var i = this.left ;i< this.left + this.width;i++){
                //console.log(i + ':' +(20 - this.top));
                Tetris.column[i] = 20 - this.top;
            }
            this.top = -3;
            this.left = 4;
            Drop.random();
        },
        clearTop:function(){
            if(this.top > 0){
                for(var i= this.left ;i<this.left + this.width;i++){
                    var ele = Tetris.GridArray[this.top -1][i];
                    if(ele){
                        Tetris.setCommon(ele);
                    }
                }
            }
        },
        clearLeft:function(left,top,width,height){
            for(var i=top;i<top + height;i++){
                if(i>=0){
                    var element;
                    if(i == top){
                        element = Tetris.GridArray[i][this.left -1];
                        Tetris.setCommon(element);
                        continue;
                    }
                    element = Tetris.GridArray[i][this.left];
                    Tetris.setCommon(element);
                }
            }
        },
        clearRight:function(left,top,width,height){
            for(var i=top;i<top + height;i++){
                if(i>=0){
                    var element;
                    if(i == top){
                        element = Tetris.GridArray[i][this.left + this.width];
                        Tetris.setCommon(element);
                        continue;
                    }
                    element = Tetris.GridArray[i][this.left+ this.width -1];
                    Tetris.setCommon(element);
                }
            }
        }
    })

    var DropTUp = Drop.extend(function(left,top,width,height){
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.shepModule = [];
        for(var i=0;i<height;i++){
            this.shepModule[i] = [];
            for(var j=0;j<width;j++){
                if(j == 1 || i == 1){
                    this.shepModule[i][j] = true;
                    continue;
                }
                this.shepModule[i][j] = false;
            }
        }
    },{
        isBottom:function(){
            clearTimeout(window.tetrisTime);
            var bottom = false;
            for(var i=this.left;i<this.left+this.width;i++){
                if(Tetris.column[i]*Tetris.SQUARE  + this.height*Tetris.SQUARE + this.top *Tetris.SQUARE >=  Tetris.HEIGHT){
                    bottom = true;
                    break;
                }
            }
            if(bottom){
                this.moveDone();
            }else{
                this.moveDown();
            }
        },
        moveDone:function(){
            if(this.top<0){
                alert("你已经输了！");
                return;
            }
            var height;
            for(var i = this.left ;i< this.left + this.width;i++){
                if(i == this.left + 1){
                    height = 20 - this.top;
                }else{
                    height = 20 - this.top -1;
                }
                Tetris.column[i] = height;
                console.log(i + ':' + height);
            }
            this.top = -3;
            this.left = 4;
            Drop.random();
        },
        clearTop:function(){
            if(this.top >= 0){
                for(var i=this.left;i<this.left + this.width;i++){
                    var element;
                    if(i == this.left + 1){
                        if(this.top >0){
                            element = Tetris.GridArray[this.top -1][i];
                        }
                    }else{
                        element = Tetris.GridArray[this.top][i];
                    }
                    if(element){
                        Tetris.setCommon(element);
                    }
                }
            }
        },
        clearRight:function(left,top,width,height){
            var element;
            for(var i = top;i < top + height;i++){
                if(i >= 0){
                    if(i == top){
                        element = Tetris.GridArray[i][left + width -1];
                        Tetris.setCommon(element);
                        continue;
                    }else{
                        element = Tetris.GridArray[i][left + width];
                        Tetris.setCommon(element);
                    }
                }
            }
        },
        clearLeft:function(left,top,width,height){
            var element;
            for(var i = top;i < top + height;i++){
                if(i >= 0){
                    if(i == top){
                        element = Tetris.GridArray[i][left];
                        Tetris.setCommon(element);
                        continue;
                    }else{
                        element = Tetris.GridArray[i][left -1];
                        Tetris.setCommon(element);
                    }
                }
            }
        }
    })


    var DropTLeft = Drop.extend(function(left,top,width,height){
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.shepModule = [];
        for(var i=0;i<height;i++){
            this.shepModule[i] = [];
            for(var j=0;j<width;j++){
                if(j == 1 || i == 1){
                    this.shepModule[i][j] = true;
                    continue;
                }
                this.shepModule[i][j] = false;
            }
        }
    },{
        isBottom:function(){
            clearTimeout(window.tetrisTime);
            var bottom = false,height;
            for(var i=this.left;i<this.left+this.width;i++){
                if(i == this.left){
                    height = this.height - 1;
                } else{
                    height = this.height;
                }
                if(Tetris.column[i]*Tetris.SQUARE  + height*Tetris.SQUARE + this.top *Tetris.SQUARE >=  Tetris.HEIGHT){
                    bottom = true;
                    break;
                }
            }
            if(bottom){
                this.moveDone();
            }else{
                this.moveDown();
            }
        },
        moveDone:function(){
            if(this.top<0){
                alert("你已经输了！");
                return;
            }
            var height;
            for(var i = this.left ;i< this.left + this.width;i++){
                if(i == this.left){
                    height = 20 - this.top - 1;
                }else{
                    height = 20 - this.top;
                }
                Tetris.column[i] = height;
                console.log(i + ':' + height);
            }
            this.top = -4;
            this.left = 4;
            Drop.random();
        },
        clearTop:function(){
            var element;
            if(this.top == 0){
                element = Tetris.GridArray[this.top][this.left];
                Tetris.setCommon(element);
                return;
            }
            for(var j=this.left;j<this.left+this.width;j++){
                if(this.top > 0){
                    if(j==this.left){
                        element = Tetris.GridArray[this.top][j];
                    }
                    else{
                        element = Tetris.GridArray[this.top - 1][j];
                    }
                }
                if(element){
                    Tetris.setCommon(element);
                }
            }
        },
        clearRight:function(left,top,width,height){
            var element;
            for(var i=top;i<top+height;i++){
                if(i>=0){
                    element = Tetris.GridArray[i][left + width];
                }
                if(element){
                    Tetris.setCommon(element);
                }
            }
        },
        clearLeft:function(left,top,width,height){
            var element;
            for(var i=top;i<top + height;i++){
                if(i>=0){
                        if(i==top + 1){
                            element = Tetris.GridArray[i][left-1];
                        }else{
                            element = Tetris.GridArray[i][left];
                        }
                        if(element){
                            Tetris.setCommon(element);
                        }
                    }
            }
        }
    });

    var  DropTRight = Drop.extend(function(left,top,width,height){
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.shepModule = [];
        for(var i=0;i<height;i++){
            this.shepModule[i] = [];
            for(var j=0;j<width;j++){
                if(j == 0 || i == 1){
                    this.shepModule[i][j] = true;
                    continue;
                }
                this.shepModule[i][j] = false;
            }
        }
    },{
        isBottom:function(){
            clearTimeout(window.tetrisTime);
            var bottom = false,height;
            for(var i=this.left;i<this.left+this.width;i++){
                if(i != this.left){
                    height = this.height - 1;
                } else{
                    height = this.height;
                }
                if(Tetris.column[i]*Tetris.SQUARE  + height*Tetris.SQUARE + this.top *Tetris.SQUARE >=  Tetris.HEIGHT){
                    bottom = true;
                    break;
                }
            }
            if(bottom){
                this.moveDone();
            }else{
                this.moveDown();
            }
        },
        moveDone:function(){
            if(this.top<0){
                alert("你已经输了！");
                return;
            }
            var height;
            for(var i = this.left ;i< this.left + this.width;i++){
                if(i == this.left){
                    height = 20 - this.top;
                }else{
                    height = 20 - this.top -1;
                }
                Tetris.column[i] = height;
                console.log(i + ':' + height);
            }
            this.top = -4;
            this.left = 4;
            Drop.random();
        },
        clearTop:function(){
            var element;
            if(this.top == 0){
                element = Tetris.GridArray[this.top][this.left + 1];
                Tetris.setCommon(element);
                return;
            }
            if(this.top > 0) {
                for (var j = this.left; j < this.left + this.width; j++) {
                    if (j == this.left) {
                        element = Tetris.GridArray[this.top - 1][j];
                    }
                    else {
                        element = Tetris.GridArray[this.top][j];
                    }
                    if (element) {
                        Tetris.setCommon(element);
                    }
                }
            }
        },
        clearRight:function(left,top,width,height){
            var element;
            for(var i=top;i<top + height;i++){
                if(i>=0){
                    if(i==top + 1){
                        element = Tetris.GridArray[i][left+width];
                    }else{
                        element = Tetris.GridArray[i][left+width-1];
                    }
                    if(element){
                        Tetris.setCommon(element);
                    }
                }
            }
        },
        clearLeft:function(left,top,width,height){
            var element;
            for(var i=top;i<top+height;i++){
                if(i>=0){
                    element = Tetris.GridArray[i][left-1];
                }
                if(element){
                    Tetris.setCommon(element);
                }
            }
        }
    })
    //定义Z形(8个)
    var DropZDown = Drop.extend(function(left,top,width,height){

    })

    var DropZUp = Drop.extend(function(left,top,width,height){

    })

    var DropZLeft = Drop.extend(function(left,top,width,height){

    })

    var DropZRight = Drop.extend(function(left,top,width,height){

    })
    //定义L形状（8个）
    var DropLdown = Drop.extend(function(left,top,width,height){

    })

    var DropLUp = Drop.extend(function(left,top,width,height){

    })

    var DropLLeft = Drop.extend(function(left,top,width,height){

    })

    var DropLRight = Drop.extend(function(left,top,width,height){

    })

    Tetris.init();
    //第一个参数：到左边框间隔的网格，
    //第二个参数：到上边框间隔的网格，
    //的三个参数：模型宽度的网格数。
    //第四个参数：模型的高度网格数。
    var dropLong = new DropLong(5,-5,1,4);
    //dropLong.moveDown();
    var dropEven = new DropEven(3,-1,4,1);
    //dropEven.moveDown();
    var dropSquare = new DropSquare(4,-3,2,2);
    //dropSquare.moveDown();
    var dropTDown = new DropTDown(4,-3,3,2);
    //dropTDown.moveDown();
    var dropTUp = new DropTUp(4,-3,3,2);
    //dropTUp.moveDown();
    var dropTLeft = new DropTLeft(4,-4,2,3);
    //dropTLeft.moveDown();
    var dropTRight = new DropTRight(4,-4,2,3);
    //dropTRight.moveDown();


    Drop.dropIndex={
        1:dropLong,
        2:dropEven,
        3:dropSquare,
        4:dropTDown,
        5:dropTUp,
        6:dropTLeft,
        7:dropTRight
    };
    Drop.begin = false;
    Drop.currentDrop = null;

    Drop.random = function(){
        var num = Math.floor(Math.random()*7+1);
        Drop.currentDrop = Drop.dropIndex[num];
        Drop.currentDrop.moveDown()
    }
    $(".btn-tetris").on('click',function(){
        if(!Drop.begin){
            Drop.begin = true;
            Drop.random();
        }
    })


    keyDown(function(event){
        switch (event.keyCode)
        {
            case 40:
                //向下
                Tetris.MOVETIME = 100;
                break;
            case 37:
                Drop.currentDrop.moveLeft()
                break;
            case 39:
                Drop.currentDrop.moveRight()
                break;
            case　38:
                //向上
                break;
            default:
                break;
        }
    });
    keyUp(function(event){
       switch (event.keyCode){
           case 40:
               Tetris.MOVETIME = 500
               break;
           default:
               break;
       }
    });
}

