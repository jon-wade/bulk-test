#Proof of Concepts for Bulk Powders

##Overview

This PoC has two elements, using 'currying' with the Ramda library and using Observables using the Rx library.

##Currying with Ramda
The PoC is very basic. The first three functions in the test-ramda.js file demonstrate the concept of using Ramda to string functions together, dropping the data in at the end. 

`var f1 = R.prop('x', {"x": 100}); // returns 100`

`f1()` shows the `R.prop()` method which returns the value of a particular property of an object supplied to the method with all its arguments complete. 

`var f2 = R.prop('x');`

`f2()` shows the same function with no object argument supplied.

`var f3 = f2({'x': 100});`

`f3()` shows `f2()` being finally supplied with its data. 

`f1()` returns 100 (the 'x' property value). `f2()` curried with `f3()` also returns 100. `f1()` and `f2()` curried with `f3()` are equivalent functions.

The fourth function `f4()` show chaining promised together with `R.composeP()`. 

`var f4 = R.composeP(p2, p1);`


There are two promises `p1` and `p2`, each which resolve after a time delay. `p1` resolves after 2 seconds, `p2` after 3 seconds. `R.compose(p2, p1)` first calls Promise `p1`, waits for it to resolve and then immediately calls `p2`, working from right to left. In this way we can create complex asynchronous calls in a synchronous way in one easy to read function. 

##Using Observables to call a mocked API

As discussed during the phone interview, to reduce server and db load, we can use Observables to only make API calls using Observables. The PoC uses SocketIO and ExpressJS to create a real-time communication link between the client and server.

Every time the client detects a change in the input field on index.html, it sends the value of that input field to the server. The server measures the time since the last message it received using `process.hrtime()` and if that value is less than 0.3 seconds it does not call the API (the API is a mocked call in this example) but instead continues to wait. If the time is greater than 0.3 seconds, it makes a call to the API.
 
 The client in turn also measures the time since it last received an input using `performance.now()` and if that time is greater than 1.5 seconds concludes that the user has stopped typing and sends a message to the server. This scenario covers a user typing very fast and then stopping without slowing down (which the server would ignore without an additional message from the client).