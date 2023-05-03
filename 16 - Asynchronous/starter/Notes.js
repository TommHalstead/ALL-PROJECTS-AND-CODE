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



*/
