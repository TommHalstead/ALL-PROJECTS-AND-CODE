'use strict';

/*

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear; // These will be instance properties
  // Never create a method inside a constructor function
};
const thomas = new Person(`Thomas`, 1997);
// ------------------- BEHIND THE SCENES ----------------------
// 1.) New {} is created.
// 2.) function is called with the `new` keyword. In the function, the `this` keyword is set to this newly created object. this = {}. And this creates a new object with these properties
// 3.) Newly created object is linked to its prototype
// 4.) Function automatically returns the `this` {firstName: `thomas` birthYear: 1997} object from the beginning.

const matilda = new Person(`Matilda`, 2017);
const jack = new Person(`Jack`, 1975);
console.log(matilda, jack);

console.log(thomas instanceof Person); // This is an operator used to check if these objects are instancesof Person. Which they are.

Person.hey = function () {
  console.log(`Hey there 👋`);
  console.log(this);
};

Person.hey();

// Prototypes
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
}; // Now since we added this function to the Person constructor functions prototype, every object created with this constructor function, now has access to this method.

thomas.calcAge(); // We now have access to this method because of prototypal inheritance

console.log(thomas.__proto__); // This is the prototype of thomas. Not the property, just the prototype. The __proto__ of any object created with this constructor function is the protoype property of the constructor function it was created with
console.log(thomas.__proto__ === Person.prototype);
console.log(
  Person.prototype.isPrototypeOf(thomas),
  Person.prototype.isPrototypeOf(Person)
); // This proves that the Person.prototype is techinally a prototype of ANY object created with this function and not the functions itself.

Person.prototype.species = `Homo Sapiens`; // Here we set a new property of the Person prototype, which then lets the objects INHERIT this property to the prototype of all the objects created with this function.
console.log(thomas.species, jack.species);

console.log(
  thomas.hasOwnProperty(`firstName`), // True, it was declared when the object was created.
  thomas.hasOwnProperty(`species`) // False, because this was added to the prototype of these objects, therefore they aren't direct proprties of this object
);

console.log(thomas.__proto__.__proto__.__proto__); // Null
console.log(thomas.__proto__.__proto__); // Prototype object of Object

console.log(typeof Person.prototype); // This is itself an object as well.

console.dir(Person.prototype.constructor); // Points back to Person

const arr = [3, 5, 23, 5, 6, 1, 8, 1, 6, 7, 8];
console.log(arr.__proto__ === Array.prototype); // The __proto__ of array is the Array.prototype, which is why we can use the Array.prototype methods and properties, due to the prototype chain.
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
}; // Here we create a method on the Array.prototype called unique, which stores a function that sends this array to a set to get the unique numbers and then spreads them into a unique array.
// Don't get into the habit of adding methods to built in arrays.

console.log(arr.unique()); // We can now call this method on ANY array, since it's on the Array.prototype

const h1 = document.querySelector(`h1`);
console.dir(h1.__proto__);
console.dir(x => x + 1);

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
const bmw = new Car(`BMW`, 120);
const mercedes = new Car(`Mercedes`, 95);

console.log(Car.prototype === bmw.__proto__);

Car.prototype.accelerate = function () {
  this.speed += 10;
  return console.log(`The ${this.make} is traveling at ${this.speed}`);
}; // We set this new accelerate function to the prototype of the Car function, therefore any object created with the Car method has access to this function through the Car.prototype chain

bmw.accelerate();
mercedes.accelerate();

Car.prototype.brake = function () {
  this.speed -= 5;
  return console.log(`The ${this.make} is traveling at ${this.speed}`);
};

bmw.brake();
mercedes.brake();

*/

/*

// Class expression
// Classes are only a special type of function
// const PersonCl = class {};

// Class declaration
// We have to give a class a constrcutor function and it must be names constructor
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this._fullName}`);
  }

  get age() {
    return 2023 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(` `)) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }
  // Static method
  static hey() {
    console.log(`Hey there 👋`);
    console.log(this);
  }
} // We do the logic the same as a constructor function by defining this.firstName to firstName and this.birthYear to birthYear
// We write the methods directly in the class code block, and these methods are stored on the objects prototype

const jessica = new PersonCl(`Jessica Davis`, 1996); // We call this class with the same `new` keyword to create this object.
console.log(jessica);
jessica.calcAge();
jessica.greet();
console.log(jessica.age);

PersonCl.hey();

// Getters and Setters

const walter = new PersonCl(`Walter White`, 1965);
const account = {
  owner: `Thomas`,
  movements: [200, 540, 345, 450],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
}; // Any setter method, must have exactly one argument

console.log(account.latest); // When we call this method, we call it as if it is just a variable, then we can do some calculations to this returned value. GETTER.

account.latest = 50; // When we call the setter method, we have to pass in the argument value which we would like to set, so we just assign the value to the variable like normal
console.log(account.movements);


*/

/*

// Object.create()
// We create an object prototype for all the Person objects.
const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // This links the steven object to the prototype of PersonProto

console.log(steven);
steven.name = `Steven`;
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__);

const matilda = Object.create(PersonProto);
matilda.init(`Matilda`, 1958);
matilda.calcAge();


*/
/*

// Prototype Linkage

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // The .call() method will still call the function but it lets you set the .this keyword within the function as the first argument
  this.course = course;
};
// Linking prototypes
Student.prototype = Object.create(Person.prototype); // With this call, Student.prototype will inherit the prototype Person.prototype.

console.log(Student.prototype === Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student(`Mike`, 1993, `Javascript`);

mike.introduce();
console.log(mike);
mike.calcAge();

console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);

Student.prototype.constructor = Student.prototype.constructor;
console.dir(Student.prototype.constructor);
console.log(mike.__proto__);

*/
// Challenge #3

/*

const Car = function (make, curSpeed) {
  this.make = make;
  this.curSpeed = curSpeed;
};

const EV = function (make, curSpeed, charge) {
  Car.call(this, make, curSpeed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
console.log(EV.prototype === Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`This ${this.make} was charged to ${this.charge}`);
};

EV.prototype.accelerate = function () {
  this.curSpeed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.curSpeed} with a change of ${this.charge}`
  );
};

Car.prototype.brake = function () {
  this.curSpeed += -10;
  this.charge += +1;
  console.log(
    `${this.make} going at ${this.curSpeed} with a change of ${this.charge}`
  );
};

const prius = new EV(`Prius`, 120, 23);
console.log(prius);
prius.accelerate();
prius.accelerate();
prius.accelerate();
prius.accelerate();
prius.brake();
prius.brake();
prius.brake();
prius.brake();
prius.brake();
prius.chargeBattery(90);
console.log(prius);
prius.brake();
prius.accelerate();

*/

/*

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this._fullName}`);
  }

  get age() {
    return 2023 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(` `)) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }
  // Static method
  static hey() {
    console.log(`Hey there 👋`);
    console.log(this);
  }
}

// Inhertitance between Classes
/////////////////////////////////////////



// This will link these two prototypes. StudentCl will now have the prototypes of the PersonCl class, because the of the `extends` keyword
// This is a child class of the PersonCl class we created above. This is denoted by the `extends` keyword and the super constrcutor function


class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); //The super keyword is used to call the constructor of its parent class to access the parent's properties and methods. It also sets the .this keyword
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2023 - this.birthYear
      } years old, but as a student I feel more like ${
        2023 - this.birthYear + 10
      }`
    ); // This calcAge() method shadows the calcAge function included in the PersonCl class because it appears and is accessed sooner than the original calcAge function, therefore it will be used.
  }
}

const martha = new StudentCl(`Martha Jones`, 2012, `Javascript`);

martha.introduce();
martha.calcAge();

*/

/*

// Inhertiance between classes: Object.create()

const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto); // This links the Person.prototype to the Student.prototype, we can now use this StudentProto to create new students.

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear); // We do this in order to reuse this function and keep the DRY principle
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto); // StudentProto is now the prototype of the jay object
jay.init(`Jay`, 2010, `Javascript`);
jay.introduce();
jay.calcAge();

*/

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // PUBLIC INTERFACE OF OUR OBJECTS
  deposit(mov) {
    this.movements.push(mov);
  }

  withdraw(mov) {
    if (mov > 0) this.deposit(-mov);
    else if (mov < 0) this.deposit(mov);
  }

  approvedloan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approvedloan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
    }
  }
}

const acc1 = new Account(`Thomas`, `USD`, 2222);
console.log(acc1);

const acc2 = new Account(`Rob`, `EUR`, 1111);
console.log(acc2);
// acc1.movements.push(250);
// acc1.movements.push(-140);

acc1.deposit(250);
acc1.withdraw(-140);
acc2.withdraw(200);
acc1.requestLoan(1000);
