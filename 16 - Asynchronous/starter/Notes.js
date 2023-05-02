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

AJAX = Asynchronous Javascript And Xml: Ajax calls allow us to request data from remote servers asynchronously. We reveive data in the background without blocking the main thread of execution.

















 




*/
