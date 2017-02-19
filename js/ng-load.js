/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,exports,module) {
    module.exports =  {
        load:function(dependencies) {
        // 返回路由的 resolve 定义，
        var definition = {
            // resolver 是一个函数， 返回一个 promise 对象；
            resolver: ['$q', '$rootScope', function($q, $rootScope) {
                // 创建一个延迟执行的 promise 对象
                var defered = $q.defer();
                // 使用 requirejs 的 require 方法加载的脚本
                require.async(dependencies, function() {
                    //我不知道高手价格这个代码什么用。似乎一点用没有，
                    // 只要下载完就改变状态就行了，没必要在ng的scope中执行。
                    //下次在点击同一个功能的时候会出现错误。
                    //$rootScope.$apply(function() {
                        // 加载完脚本之后， 完成 promise 对象；
                        defered.resolve();
                    //});
                });
                //返回延迟执行的 promise 对象， route 会等待 promise 对象完成
                return defered.promise;
            }]
        };
        return definition.resolver;
    }
    }
});

