var Thenjs = require('thenjs');
var debug = true;
var task = function(value, cont){
	Thenjs.nextTick(function(){
		cont(null, value);
	});
};
var task2value = function(value, cont){
	Thenjs.nextTick(function(){
		var value2 = '22'
		cont(null, value, value2);
	});
};
var errorHandler = function(cont, error){
	console.log('error in error handler:', error);
	cont();
}

Thenjs(function(cont, debug){
	task(10, cont);
})
.then(function(cont, arg){
	console.log(arg);
	cont(new Error('error!'), 123);
})
.fin(function(cont, error, result){
	console.log(error, result);
	cont();
})
.each([1,2,3], function(cont, value){
	task(value*2, cont);
})
.then(function(cont, result){
	console.log(result);
	cont();
})
.eachSeries([1,2,3], function(cont, value){
	task2value(value*3, cont);
})
.then(function(cont, result, value2){
	console.log(result, value2);//unknown
	cont();
})
.series([
	function(cont){
		task(88, cont);
	},
	function(cont){
		task(90, cont);
	},
	function(cont){
		cont(null, 99);//sync
	}
	])
.then(function(cont, result){
	console.log("result array:",result);
	cont(new Error('error!!'));
})
.then(function(cont, result){
	console.log("result:",result);
	cont(new Error('error!!'));
}, errorHandler)// if errorHandler exists , fail won't run ,cause it handler last error
.fail(function(cont, error){
	console.log(error);
	console.log('END!');
});

