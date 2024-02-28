'use strict';
/////////////////////////////
//------Video 209 - Constructor Functions -------
/*
const Person = function (firstName, lastName, birthYear) {
  console.log(this); // logs Person{}
  //Instance properties
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;

  //Never do this as it you end up creating this method each time an object is instatiated
  this.calcAge = function () {
    console.log(new Date().getFullYear() - this.birthYear);
  };
};*/
/*
const adam = new Person('Adam', 'Studholme', 1988);
console.log(adam);
//--Steps when the new keyword is called with a constructor function
//1. New {} is created
//2. function is called and this = {}
//3. {} link to prototype
//4. function automatically returns {}
// you can then map the function arguments to the this keyword to build
//the object Instance properties

// function constructor can be re-used
const matilda = new Person('Matilda', 'Aireheart', 2017);
const jack = new Person('Jack', 'Sparrow', 1975);

const jay = 'Jay';

// You can check if a something is an instance of an Object
console.log(adam instanceof Person); // True
console.log(jay instanceof Person); // False

//----------- Video 210/211 - Prototypes ----------
//Instead of adding methods to the constructor they can be added to the
//Prototype and then called by and instance of the Person object

Person.prototype.calcAge = function () {
  console.log(new Date().getFullYear() - this.birthYear);
};

adam.calcAge(); //36
jack.calcAge(); //49
matilda.calcAge(); //7

console.log(adam.__proto__);
console.log(adam.__proto__ === Person.prototype); // True
console.log(Person.prototype.isPrototypeOf(adam)); // True
console.log(Person.prototype.isPrototypeOf(Person)); // False

// You can set properties on the prototype and the objects will inherit this
Person.prototype.species = 'Homo Sapiens';
console.log(adam.species);

// You can check if the property is in the object or if its being inherited
console.log(adam.hasOwnProperty('firstName')); // true
console.log(adam.hasOwnProperty('species')); // false

//------- Video 212 - Prototypal Inheritance on built in Objects -----------
const arr = [3, 2, 2, 5, 6, 7, 8, 8, 5, 9, 32];
console.log(arr.__proto__);

//Adding new methods to a built in prototype (not recommended!)
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique()); //[3, 2, 5, 6, 7, 8, 9, 32]

const h1 = document.querySelector('h1');
console.dir(h1); // Returns all the properties and methods of the h1 object
console.log(h1.__proto__); // Returns HTMLElement object
console.log(h1.__proto__.__proto__); // Returns Element object
// The prototype chain continues down another 3 steps until it reached Object

//----------------- Coding Challenge #1 ----------------------

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
};
Car.prototype.brake = function () {
  this.speed -= 5;
};

const bmw = new Car('bmw', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
console.log(bmw.speed);
bmw.brake();
console.log(bmw.speed);

//------------- Video 214 - ES6 Classes ------------------
//1. Classes are NOT hoisted
//2. Classes are 1st class citizens, so they can be passed into and returned from functions
//3. Classes are executed in strict mode

//Class Expression
//const PersonCL = class{}

//Class Declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Methods can be written inside the class declaration (outside of the constructor) and will automatically be added to the Prototype of the class
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  //Adding getters and setters in a class declaration

  get age() {
    return `${this.fullName} is ${this.calcAge()} years old.`;
  }

  //Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name; // Have to use _fullName to prevent a conflict of names
    } else {
      alert(`${name} is not a full name`);
    }
  }
  // The getter then can set the fullName back from the _fullName to fullName
  get fullName() {
    return this._fullName;
  }

  //Static Method
  static hey() {
    console.log('Hi!');
  }
}

const jessica = new PersonCl('Jessica White', 1990);

console.log(jessica.fullName);
console.log(jessica.calcAge());

console.log(jessica.age);

const walter = new PersonCl('Walter White', 2000);

// ----------- Video 215 - Getters & Setters ------------------

const account = {
  owner: 'Adam',
  movements: [200, 150, 234, 13],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // Returns 13
account.latest = 50;
console.log(account.movements); //[200, 150, 234, 13, 50]

//------------ Video 215 - Static Methods ----------------

PersonCl.hey(); // Method is now on the constructor
jessica.hey(); // Will not work as hey is not on the PersonCL prototype


// ----------------- Video 216 - Object.Create() -----------------

const PersonProto = {
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
// You can link an object to the prototype with the Object.Create Method

const steven = Object.create(PersonProto); //steven is now an empty object with the PersonProto prototype
steven.name = `Steven`;
steven.birthYear = 2001;
console.log(steven.calcAge());

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1981);

console.log(sarah.calcAge());

//----------- Coding Challenge #2 ---------------

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate = function () {
    this.speed += 10;
    console.log(this.speed);
  };
  brake = function () {
    this.speed -= 5;
    console.log(this.speed);
  };

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);

console.log(ford);

ford.speedUS = 100;

console.log(ford.speed);

console.log(ford.speedUS);

ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.brake();
ford.accelerate();
ford.accelerate();


// -------------- Video 219 - Inheritance between classes -------------

const Person = function (firstName, lastName, birthYear) {
  console.log(this); // logs Person{}
  //Instance properties
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(new Date().getFullYear() - this.birthYear);
};

//-- Using constructor functions

const Student = function (firstName, lastName, birthYear, course) {
  Person.call(this, firstName, lastName, birthYear);
  this.birthYear = birthYear;
  this.course = course;
};
//Create connection to Person prototype - must be done before adding anything to student prototype otherwise it will overwrite them
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(
    `My name is ${this.firstName} ${this.lastName} and I study ${this.course}`
  );
};

const mike = new Student('Mike', 'Jones', 1998, 'Computer Science.');

mike.introduce();
mike.calcAge(); // can use calcAge as Student is inheriting from Person class.

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);


// ---------------- Coding Challenge #3 ---------------------

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
};
Car.prototype.brake = function () {
  this.speed -= 5;
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`Battery charged to ${this.charge}%`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  --this.charge;
  console.log(
    `This ${this.make} is traveling at ${this.speed} and has ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);

tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.accelerate();
tesla.chargeBattery(80);
tesla.accelerate();
tesla.brake();


// -------- Video 221 - Inheritance between Classes (ES6) ----------------

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Methods can be written inside the class declaration (outside of the constructor) and will automatically be added to the Prototype of the class
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  //Adding getters and setters in a class declaration

  get age() {
    return `${this.fullName} is ${this.calcAge()} years old.`;
  }

  //Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name; // Have to use _fullName to prevent a conflict of names
    } else {
      alert(`${name} is not a full name`);
    }
  }
  // The getter then can set the fullName back from the _fullName to fullName
  get fullName() {
    return this._fullName;
  }

  //Static Method
  static hey() {
    console.log('Hi!');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); //Must happen first!
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    return console.log(
      `I'm ${
        new Date().getFullYear() - this.birthYear
      } years old, but as a student I feel ${
        new Date().getFullYear() - this.birthYear + 10
      } years old!`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2004, 'Computer Science');

martha.introduce();
martha.calcAge();



// ------------ Video 222 - Inheritance between 'classes' Object.Create() ----------

const PersonProto = {
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

// The student proto inherits it proto from PersonProto
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// The jay inherits it proto from StudentProto which inherits from PersonProto
const jay = Object.create(StudentProto);

jay.init('Jay', 2000, 'Computer Science');

jay.introduce();
console.log(jay.calcAge());


//------------------ Video 223 - Another class example -----------
// ----------------- Video 224 - Encapsulation Protected Properties and Methods -----

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //Protected property
    this._pin = pin;
    //You can add variables to a constructor that do not require any argument
    //Protected property (using the '_') lets devs know the property is not to be touched outside of class
    this._movements = [];
    this.locale = navigator.language;
    // You can add anything you want to happen on intialization
    console.log(`Thanks for opening an account ${this.owner}`);
  }
  //Public interface (API) for the object.
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }
  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan Approved');
    }
  }
}

const acc1 = new Account('Adam', 'GBP', 1234);

acc1.deposit(250);
acc1.withdraw(140);

console.log(acc1);


// --------------------- Video 225 - Truly Private class fields and Methods ----------------------
// 1)Public fields
//2) private fields
//3) Public methods
//4) Private methods

class Account {
  //1) Public fields (instances)
  locale = navigator.language;

  //2) Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // You can add anything you want to happen on intialization
    console.log(`Thanks for opening an account ${this.owner}`);
  }
  //Public interface (API) for the object.
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // Added for chaining purposes
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan Approved');
      return this;
    }
  }

  // 4) Private Methods - Currently not fully supported
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Adam', 'GBP', 1234);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(500);
//console.log(acc1.#movements); // This now throws an error as movements is a private field

//------------ Video 226 - Chaining Methods -------------------
// To enable chaining of object methods you need to return the object in the methods so the next method knows what
// it is acting on
console.log(
  acc1
    .deposit(300)
    .deposit(500)
    .withdraw(35)
    .requestLoan(25000)
    .withdraw(5000)
    .getMovements()
);
*/

// ---------------- Coding Challenge #4 -----------------------

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  // Make charge a private property
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  // Ability to chain chargeBattery , accelerate and brake methods
  accelerate() {
    this.speed += 20;
    --this.#charge;
    console.log(
      `This ${this.make} is traveling at ${this.speed} and has ${
        this.#charge
      }% battery.`
    );
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`Battery charged to ${this.#charge}%`);
    return this;
  }
}

// Test class functionality

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);

console.log(rivian.accelerate().accelerate().brake().accelerate().accelerate());

console.log(rivian.speedUS);
