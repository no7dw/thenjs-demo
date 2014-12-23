var then = require('thenjs');

then(function (defer) {
    // start asnys task
    // use defer as callback function
    var param = 1;
    asnycTask1(param, defer);
}).
then(function (defer, value1, value2) {
    // successHandler, value1, ... from asnycTask1
    asnycTask2(value1, value2, defer);
}, function (defer, err) {
    // errorHandler, err from asnycTask1
    console.error(err);
}).
then(function (defer, value) {
    // successHandler, value from asnycTask2
    asnycTask3(value, defer);
}).
then(function (defer, value) {
    // successHandler, value from asnycTask3
    asnycTask4(value, defer);
}).
fail(function (defer, err) {
    // global errorHandler, err from asnycTask2 or asnycTask3
    console.error("global err",err);
});

asnycTask1 = function(param, cb){
    console.log("task1", param);
    cb(null,1,2);
};
asnycTask2 = function(param1, param2, cb){
    console.log("task2", param1, param2);
    cb(null,2);
};
asnycTask3 = function(param, cb){
    console.log("task3", param);
    cb({err:3},3);
};
asnycTask4 = function(param, cb){
    console.log("task4", param);
    console.log("this won't output");
    cb(null,null);
};
