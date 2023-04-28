// OBJECT ORIENTED PROGRAMMING (OOP) : A programming paradigm based on the concepts of objects ( How we write and organinze code)

// We use objects to MODEL OR DESCRIBE real-world or abstract features. E.g. user or todo list items. Or even HTML components or data structure

// Objects can have proprties and methods, by using objects we pack all of this data and corresponding behaviors into one block

// In OOP, objects are self-contained pieces and/or block of code, these objects act as building blocks for our code and interact with one another.

// These interactions happen through a public interface (API): The API contains methods that the code that is outside of the object can use to access and communicate with the objects methods and properties

// This paradigm was created with the goal of keeping the code organized, more flexibe and easier to maintain. Avoiding variables and functions being spread out all over the place.

// In OOP we need a way to create objects dynamically in order to use them to interact with our code in an effecient and clean way. This is achieved with classes and instances.

// Classes are like blueprints in which we use to designate parameters in describing how we would like to build this object

// ALL OBJECTS CREATED THROUGH A CLASS ARE CALLED INSTANCES OF THIS CLASS

// 4 IMPORTANT PRINCIPLES OF OOP

// Abstraction - Ignoring or hiding any details that aren't imperative to our classes.

// Encapsulation - Keeping properties and method private inside the class, so that they are not accessible from outside of that class. Some methods can be exposed as an API. This protects external code from accidentally interacting with and manipulating properties/states.

// Inheritance - When we have a need for two similar (but not quite the same) classes, we can have one class inherit properties and methods from the parent class. This would mean, the child class extends the parent class and inherits all of the properties and methods from its parents class - Inherticance makes all properties and methods of a certain class available to a child class. PARENT -> child which forms a hierarchy. Then a child class can also have its own individual classes

// Polymorphism - A child class can overwrite a method it has inherited from its parent class. We simply just write our own logic within the inherited method inside the child class, using the same method name, just to overwrite the inherited method.

// An instance is the object created by a class constructor. The process of creating an instance is called instantiation. So we say, objects or instances are instantiated from our classes.

// ALL objects in javascript are linked to a certain prototype object. Each object has a prototype, every prototype has their own methods that our objects can access and use, this behavior is called protypal inheritance

// Prototypal inheritance is when ALL objects linked to this prototype is able to use this prototypes methods and properties that are defined in that prototype.

// Prototypal inheritance is different from normal inheritance where classes can inherit from their classes. Prototypal inheritance is an instance (or object itself) inheriting from a class.

// Objects delegate behavior (methods) to the linked prototype object. When we use an array method on an array, the array delegated the bahavior of mapping to the prototype. Array methods are not defined on our arrays that we create ourselves, but rather they are borrowed from that arrays prototype.

// 3 ways of creating prototypes are as follows:

// 1.) Constructor functions - Technique to create objects from a function. Built-in objects like Arrays, Sets, and Maps are implemented with the constructor function.

// 2.) ES6 Classes - Modern way instead of constructor functions. Syntactic sugar over contructor functions. Just like constructor functions, just better syntax. These DO NOT behave like classes in `classical OOP`

// 3.) Object.create() - Easiest and most straightforward way of linking prototypes to classes. However not as used as the previous two methods.

// Constructor functions always start with a capital letter
// Arrow functions do not work as constructors
// We want this object to have a firstName and birthYear, so we pass these as arguments in to the constructor function
// We set the this.firstName = the argument firstName and same with the birthYear. this.birthYear = birthYear. Since `.this` is pointing to the newly created object.

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// const thomas = new Person(`Thomas`, 1997);
// console.log(thomas);

// const matilda = new Person(`Matilda`, 2017);
// const jack = new Person(`Jack`, 1975);
// console.log(matilda, jack);

// When we call a constructor function, we have to call it with the new keyword. This is what creates the object. Calling the function with the `new` keyword.
// ------------------- BEHIND THE SCENES ----------------------
// 1.) New {} is created.
// 2.) function is called. In the function, the `this` keyword is set to this newly created object. this = {}.
// 3.) Newly created object is linked to its prototype
// 4.) Function automatically returns the `this` {firstName: `thomas` birthYear: 1997} object from the beginning.

// Constructor functions are not a built-in part of the Javscript language, but rather they are methods that individual developers have come up with themselves, that the developer community has adopted.

// Prototypes. Each AND every function within javascipt automatically has a property called prototype.

// Every object created with a certain construcor function, will get access to all of the methods and properties defined on that constructors prototype property.

// The .constructor property on the Object.prototype will hold a reference back to the constructor function.

// The Person.prototype has its own prototype as well, which is the Object.prototype. This Object.prototype was created by the built-in javascript constructor function. This is the function that is called behind the scenes when we create an object literal. {}

// All these linked prototypes are what is called the prototype chain. The Object.prototype is usually the top of the prototype chain, so its protoype is null. This is the end of the proto chain.

// 1.) Classes are NOT hoisted

// 2.) Classes are first-class citizens - We can pass them into functions and return them from functions as well

// 3.) The body of a class is always executed in strict mode
