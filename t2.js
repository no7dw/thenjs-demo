var Thenjs = require('thenjs');
var debug = true;
var task = function(value, cont){
	Thenjs.nextTick(function(){
		cont(null, value);
	});
};

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
.series([
	function(cont){
		task(88, cont);
	},
	function(cont){
		cont(null, 99);//sync
	}
	])
.then(function(cont, result){
	console.log(result);
	cont(new Error('error!!'));
})
.fail(function(cont, error){
	console.log(error);
	console.log('END!');
});

