/**
 * Created by Administrator on 2016/5/29.
 */

;function name(a){
    function timeall(){
        window.setInterval(function(){
            console.log(a++);
        },2000)
    }

    timeall();
}(20);