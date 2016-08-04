var R = require('ramda');
var p1 = require('./promise1.js');
var p2 = require('./promise2.js');

//experiment using R.prop()

//R.prop method returns the property value of the property passed in as the first argument
var f1 = R.prop('x', {"x": 100}); // =>100

//with currying you can pass in a partial list of arguments for dropping in data at a later stage which then returns a function
var f2 = R.prop('x');

//passing the remaining arguments into the R.prop function, returns the same result as f1()
var f3 = f2({'x': 100});

//console outputst
console.log('f1=', f1);

/*
 f1= 100
 */

console.log('f2=', f2);

/*
 f2= function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
        return f1;
    } else {
        return fn.apply(this, arguments);
    }
 }
 */

console.log('f3=', f3);

/*
 f3= 100
 */

//experiment using R.composeP();
//right-to-left function composition using promises

var f4 = R.composeP(p2, p1);
console.log('f4()=');
f4();


