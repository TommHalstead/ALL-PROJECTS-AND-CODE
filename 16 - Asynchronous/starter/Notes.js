/*

ASYNCHRONOUS JAVASCRIPT 

Asynchronous Javascript is long running applications or programs that will run in the background by themselves.

The most common use of Async is to get data from remote servers in what are called AJAX calls

Part of Asynchronous Javascript are Promies, the fetch function, async await and error handling

Asynchronous is blocks of code running in the background and when the current thread is done parsing data, the code blocks will be sent back to the main thread on the event loop and task queue and await execution.

The setTimeout() function is Aynchronous. It runs in the background, while waiting to execute the code in the callback function. The JS engine doesn't stop code execution because to wait on the timer, instead it's async that allows the timer to run in the background while still reading the code.

Methods such as alert() blocks the call stack from being executed until the user disables the alert. That is synchronous Javascript.

The setTimeout() function and all async is considered non-blocking because it does not block the call stack from being executed. It gets placed at the end of the call stack awaiting execution once the timout is done.

Async is about coordinating the behavior of our program over a certain amount of time.

Callback functions alone DO NOT make code asynchronous.

Assigning a .src attribute to an image is does asynchronously because in the background the image is laoding. Then adding an eventhandler with the event as `load` is non-blocking and doesn't call the function related to the eventHandler until the picture has loaded, and therefore does not block code from being executed.

Only the .src by itself is async.

AJAX = Asynchronous Javascript And Xml - JSON: Ajax calls allow us to request data from remote servers asynchronously. We reveive data in the background without blocking the main thread of execution.

With AJAX we make an HTTP request to a server for some data, the server will send back the response with the requested data. This all happens asynchronously. There can be get requests to get data or there can be set requests to send information to a server.

A web API is Application Programming Interface. It's a piece of software that may be utilized by another API or software to allow applications to talk with each other to set/get data. - THIS IS TRUE FOR ALL OF PROGRAMMING

- DOM API - GeoLocation API - Leaflet API -

--- Own class API (Objects made from a class are self contained pieces of software that allows data to be transferred) --- 

-- ONLINE API (App. running on a web server that receives requests for data and sends back data it has retrieved from some database or some other type of API as a response)--- Called just plainly 'API' or Web API

 JSON is the most popular data format today. It's basically just a javascript object converted to a string. Therefore it's easy to send across the web JSON.stringify(object) will turn a string of data into a javascript object and JSON.parse(`string`) will convert a javascript string to an object. 

 There are API's for EVERYTHING. GitHub has a public-apis repo created to store hundreds of APIs used for almost anything. 

 An API endpoint is another name for the URL related to the API.

  With the old method of XMLHttpRequest, we have to add an event handler to listen to the request in order to load the data once it has finsihed loading. This is all async. We then use the .responseText property to access the property on the object that contains the response from the API. This response is in JSON format, a formatting method of sending data across APIs. 

// Multiple ways of doing AJAX calls
// 1.) Create the variable containing the XMLHttpRequest() AJAX call - OLD SCHOOL WAY

const request = new XMLHttpRequest();

// 2.) Use the .open() method on the request object and specify the first param as `SET` or `GET`
request.open(`GET`, `https://restcountries.com/v3.1/alpha/US`);

// 3.) Send off the request to the desired URL
// This is all done asynchronously in the background
// 4.) We then add an event listener to listen for this data to load, only then can we access this data.

The concept of requesting and receiving data is called the REQUEST-RESPONSE MODEL or CLIENT-SERVER ARCHITECTURE

Every URL gets and HTTP or HTTPS protocal that will be used on the connection. Then there's the domain name and after the slash / the so called `resource` that we want to access. 

The real address of the server we're trying to access is not the domain name but the resource is what we're accessing. In order to access this we have to `convert` the domain name to the real address of the server. This happens through DNS (Domain Name Server) - A special kind of server that acts like a phonebook of servers.

Through DNS we look up the real name of the domain server, and converts this resource to the real IP address. After the real IP address has been sent back to the browser, we can then finally call it.

A real domain server address looks like this: https://104.27.142.425:443

We have the protocol HTTPS, then we have the IP address 104.27.142.425 then we have the port number default :443 for HTTPS and :80 for HTTP  

Once we have the real IP address a TCP/IP socket is made between the browser and the web client and is typically kept alive for the whole duration of the file transfers and/or data transfer

TCP - Transmission Control Protocol 

The job of the TCP is to break down the request into thousands of small chunks called packets (which is how you DDoS ) when these packets arrive at their destination, TCP reassembles all of the packets into the original request. This is necessary so that the packets all take a different route on the internet and therefore arrive much quicker than one single big packet

IP - Internet Protocol

The Job of the IP protocol is to actually send the packets themselves to the destination by adding an IP address on each packet and routing them to the destination IP address.

Together these are communication protocols that define exactly how data travels across the web. 

After all of this is done, we make the request, which is a HTTP (Hypertext Transfer Protocol) request, which is another communication protocol (a sytsem of rules that allows two applications to communicate )

HTTP methods include: GET(To get data), POST(To set data), PUT and PATCH (to modify data)

The HTTP response comes from the web server and is similar to the request, it has a start line, HTTP request header and a request body. The start line on the response has the HTTP version, the status code (200) means OK and (404) mean PAGE NOT FOUND, which is where this error comes from. It comes from the HTTP request being made to a pages IP address that is not there. 


This whole process goes as ordered: 1.) DNS lookup 2.) TCP/IP socket connection 3.) HTTP Request 4.) HTTP Response

A new HTTP request is made for every single file that is included in the webpage, for example: index.html, resources.html, about.html etc.

When the response has arrived, the file can be loaded in the browser according to the HTML, CSS and JS specs.

Callback hell is when you have callbacks inside of callbacks inside of callbacks to sequentiate the calls of these functions. 

A triangular structure of the code on the left hand side is an easy way to indicate callback hell. Callback hell makes our code hard to understand and reason about, as you have many sequences happening that you have to break down step-by-step. It's also hard to maintain because changing one thing can affect all of the nested callbacks.

Code that is hard to understand is bad code.

Promises are a way of fixing and escaping callback hell.

Promises and the Fetch API - We start a fetch request with a simple fetch(`url`) call and store the return value into a variable. What is returned is a promise from the request.

A promise is an object that is used as a placeholder for the future result of an asynchronous operation call. e.g the response from the AJAX call. We use a promise to negate the need to rely on eventHandlers and callbacks passed into async functions to handle async results.

We can chain promises for a sequence of asynchronous events to happen in the background. Thus escaping callback hell and having to listen for callbacks in order to get this data.
 
Promises work with Async operations, meaning they are time sensitive. Meaning they can be in different states, this is what is called the lifecycle of a prommise. In the beginning, a promise is pending (this is before the value is available from the request) when the task finished, the promise is settled. There are two types of settled, fulfilled promises and rejected promises. A fulfilled promise has successfully resulted in a value. A rejected promise are promises that weren't able to retreive the data requested.

A state in this case represents the pending status of the promise, or it being fulfilled or rejected. These are all different states of the promise. A promise state only changes once. It goes from pending to either FULFILLED or REJECTED. This will be the promises final state, it will not change in any way after this.

These states are useful when we need to use this promise to get a result. We call using the promise, CONSUMING the promise. In order for a promise to be consumed, it must first be assembled by the packets it's sent with. The FETCH API is the one that will build the promise. 

Sometimes we must build a promise ourselves in order to consume it. When a promise is fullfilled, in order to consume it, we use the .then() method, which takes a callback function as a parameter that we want to be executed as soon as the promise is fulfilled. This callback function takes a parameter which is the value of the fulfilled promise. Follwed by the .catch() method

Our data is stored in the body of the response object. In order to use this data, we must call the JSON method on the response. The .json() method is available to all response objects coming from a fetch call. When we call the json() method on our response, it will return another promise. In order to use this promise, we must return the response with the json() call on it. Then we must handle the promise returned back from the response.json() call. In order to do this, we add another .then() call onto 

------------------------------------------------------------How to use the .fetch() API-------------------------------------------------------------

fetch(`url`).then(function(response){
  // Use the response to do what you need.
  console.log(response) -- Object of properties, with values and methods.
})

// Chaining promises

The .then() method ALWAYS returns a promise, whether it's rejected or fulfilled. If fulfilled, the promises return value will be the data.

return 23;
    })
    .then(data => alert(data));

This will return 23 because that is the return value of the promise before it. When we call the .then() method, the parameter will always be the promise in which we are calling it on.

return fetch(`https://restcountries.com/v3.1/alpha/${code}`); - When we return this fetch call, the return value of the fetch is a promise, in which we can call the .then() method on.


We return a fetch and call it on the encompassing .then() callback in order to escape callback hell. Instead, we call the .then() method on the entire function itself because we return the promise to the function, which now becomes the functions value.

                                          ---------- How to handle promise rejections ----------

A promise is only rejected if the user loses internet connection. As a second parameter in our .then() method call, we can designate a second function to handle the promise in the event of a rejected response. Instead of passing in a callback function for error handling on all instances of .then() usage, we can add a .catch() method to catch any and all errors within the promises.

Using the .catch() method at the end of any fetch() request chain will catch any and all errors that come back back through any of these promises, we can set our custom console.error() messages, and we can print an error to the UI for the user.

We can then after using all of these methods use the .finally() method to call a method regardless of the promise state. So this callback method will always be called regardless if the promise was fulfilled or not.

.then() callback function is only called if the promise is fulfilled, .catch() is only called when a promise is rejected and .finally() is always called regardless if the promise was fulfilled or rejected.

The .finally() promise method only works because the .catch() method returns a promise as well.

When we have an error with our promise, we get a generic typeError unrelated to the actual issue. In order to catch this error, we can use the `throw new Error()` function with a custom error to the console. The new Error() sybtax is a constructor function that throws an error. The throw keyword will immediately exit the code block and resume normal execution.

When we use a `throw new Error()` inside any .then() promise handler, and we actually throw an error, then the promise will immediately rejection. This will propegate all the way down to the .catch() error handler. 


We first always have to call the .then() to handle to original promise and parse it to json, after that we can use the .then() function again to actually handle the data.

The .catch() handler will catch all errors from the previous .then() statements and propegate all the way down to the .catch() function

An error that is thrown in the .then() function, will ALWAYS reject the promise immediately.

Asynchronous happens because we have the event loop and the callback queue and web APIS which handle asynchronous events, timers, eventHandlers, loading images are all async events that get handled by web APIs that javascript has access to.

When using timers and/or timed events, we are guaranteed that this callback function won't be called before our timer states, but depending on the callback queue size, it could be called later than the timer specifications. Any and all events are put into the callback queue.

The event loop is a loop that loops between the callstack and the callback queue and constantly checks if the callstack is empty, if it is empty, it will place the first item in the callback queue into the callstack. This loop and act is called an event loop tick. The event loop orchestrates the javascript runtime.

The JS language itself has no sense of time. All Async events happen and are managed by the runtime, and the event loop that decides what code to execute next. The engine itself (call stack ) executs whatever code it is given.

When we do .addEventListener() it registers the callback, which waits in the runtime web APIs environment until the load event is fired off, then the web API environment places the callback in the queue, it then waits for the event loop to pick it up and place it in the call stack.

Callback functions that are registered with the fetch() function and linked to promises in the .then() method, do not go into the callback queue.

Callback functions associated with promises, go into the "microtask queue", the microtask queue has priority over the callback queue. So at the next cycle of the event loop, it also checks the microtasks queue for any tasks. If there are any tasks, it will execute all of these as soon as the callstack is empty before resuming focus to the callback queue.

You can build your own promise with the promise constructor. E.g new Promise(); Promises are a special kind of object in javascript, therefore we can use the object constructor method on them.

The promise constructor takes exacly one argument, and that is the so called executor function. Into the executor function we pass in two arguments which are the resolve and reject functions. Therefore when we create use this new Promise syntax, we are in fact creating a new promise. Within the executor function, we pass in the value in which we want to be the resolved promise of this whol entire function. When we call the resolve() function inside of the executor function, it marks the promise as resolved. We pass the fulfilled value of the promise into the resolve() function so that it can later be manipulated with the .then() method.

Within this new Promise constructor, we create an if block for the resolved promise return value, which we pass into the resolve() function itself. We create an else statement in order to execute the reject() function in case of a rejected promise. We ALWAYS have to make sure that our promise ends up in one of these two states, either fullfilled or rejected. 

So our fulfilled promise result is the value that we pass into the resolve() function and our rejected promise result is the value that we pass into the reject() function. When we throw a rejection, we should use within the rejection value, `new Error()` so that in case of a rejection, it will throw a new error to the console with the real reasoning.

Promisifying is the act of wrapping old callback based function into promises. Converting callback based async behavior to promise based behavior, in order to avoid having stacked callbacks.

Passing a value into the resolved promise, is not mandatory.

The geolocation API takes two callbacks, one for success with the parameter of the position of the current user, the second an error callback to call incase grabbing the location was unsuccessful. It may have a third optional object of options.

IN ORDER TO GET ACCESS TO A FULFILLED PROMISE WE DEFINE WITHIN A FUNCTION, WE MUST RETURN THAT PROMISE FROM THE FUNTION SO WE CAN CHAIN IT!


// PROMISES

When creating a new promise, we use the new Promise syntax. This promise has an executor function. The executor function is called immediately, it takes two parameter which are functions as arguments. The resolve function and the reject function. The executor function is where we put our code that we would like to be asynchronous (we put the code we would like to do to our resolved promise in the case that it is resolved). 

// RESOLVE FUNCTION INSIDE OF EXECUTOR FUNCTION

We use the resolve function to set the promise as resolved. AFTER WE DO WHATEVER LOGIC THAT WE WOULD LIKE TO DO TO THE PROMSE, we pass the `resolved` promise into the the resolve() function, so that we can later consume it with the then() method on that fulfilled promise.  
*/
