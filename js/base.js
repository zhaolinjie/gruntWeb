/**
 * Created by Administrator on 2016/11/21.
 */

function inherit(o){
    if(o == null) throw "不能从null继承";
    if(Object.create){
        return Object.create(o);
    }
    var t = typeof o;
    if(t !== "object" && t !== "function") throw "只能从对象和构造函数继承";
    function f(){};
    f.prototype = o;
    return new f();
}

function extend(o,p){
    for(prop in p){
        o[prop] = p[prop]
    }
    return o;
}

function merge(o,p){
    for(var prop in p){
        if(o.hasOwnProperty[prop]) continue;
        o[prop] = p[prop];
    }
    return 0;
}

function defineSubClass(superClass,constructor,methods,statics){
    constructor.prototype = inherit(superClass.prototype);
    constructor.prototype.constructor = constructor;
    if(methods) extend(constructor.prototype,methods);
    if(statics) extend(constructor,statics);
    return constructor;
}

Function.prototype.extend = function(constructor,methods,statics){
    return defineSubClass(this,constructor,methods,statics);
}

//jquery将上下左右键给屏蔽掉了
function keyDown(f){
    if(document.addEventListener){
        document.addEventListener('keydown',f)
    }
    if(document.attachEvent){
        document.attachEvent('onkeydown',f)
    }
}

function keyUp(f){
    if(document.addEventListener){
        document.addEventListener('keyup',f)
    }
    if(document.attachEvent){
        document.attachEvent('onkeyup',f)
    }
}