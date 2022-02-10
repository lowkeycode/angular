# Angular

#### Versioning

AngularJS (Angular 1) 
 - Wasn't future proof so creators rewrote in Angular 2, a completely different framework and release a new version about every 6 months on this new framework.

 Angular (Angular 2+)
 - All these version are just referred to as Angular


## Typescript Intro 

- A superset of JS that offers more features than JS that is strongly typed (Static types). Ex.) Types, Classes, Interfaces...
- Compiled to JS by Angular CLI to run in the browser


npm install typescript in your project

Then we need to invoke the TS compiler
We need to set up a TS config file to let the compiler know which files to compile or alternatively we can select individual files

npx tsc your-file.ts

As JS
```js
const add = (a, b) => a + b;

console.log(add(3,5));
```

As TS
```ts
const add = (a: number, b: number) => a + b;

console.log(add('3',5));
// Shows error in IDE because of string used as argument
```

Compiled TS to JS (Automatically polyfills)
```js
var add = function (a, b) { return a + b; };
console.log(add('3', 5));
```


#### Base Types & Primitives

Strings, Numbers, Booleans, BigInt, Undefined, Symbols & Null

Basic assignments work as expected except with null and undefined as now we are expecting those values to stay null or undefined.

```ts
let age: number;
age = 12;

// or let age: number = 12;

let userName: string;
userName = 'Cam';

let isLearningAngular: boolean;
isLearningAngular = true;

let hobbies: null;
hobbies = 12;

let isCool: undefined;
isCool = true;
```

#### Reference Types (Arrays & Objects)

- We can define the arrays to hold certain types using the [] syntax
- Objects are defined using the {} syntax which is defining a type, not creating an object literal. Then we set the types of each property that we want the object type to have.
- We can also combine TS type features to start to build more complex structures such as an array of objects that contain properties with their own types

```ts
let hobbies: string[];
hobbies = ['Rock Climbing', 'Longboarding', 'Music', 'Drawing']

let person: {
  name: string;
  age: number;
};

person = {
  name: 'Cam',
  age: 32
}

// person = {
//   isCool: true,
// }
//  This one errors as isCool does not exist in the definition as a key. Even if it was a matching key such as name, it would error because a boolean is not expected.

let people: {
  name: string;
  age: number;
}[];
```

#### Type Inference

TS uses type inference and tries to infer as many types as possible. Below course is now inferred as the type string so trying to set it to a number will now throw an error. It is best practice to embrace this and not unnecessarily define every type manually.

```ts
let course = 'Angular';

course = 12;
```

#### Union Types

Union types use a single pipe to let TS know more than one specified type can be expected (You can have as many union types as you need).

```ts
let course: string | number = 'Angular';

course = 12;


let car: string | {
  make: string;
  color: string;
} | boolean = 'Ford Focus RS';

car = {
  make: 'ford',
  color: 'red'
}
```

#### Assigning Type Aliases

We can see that both these structures share the type definition that is on the person object. To avoid this duplication we can define a base type as an alias using the type keyword with any name of our choice as the alias. This makes code more concise and easier to maintain.

```ts
let person: {
  name: string;
  age: number;
};

let people: {
  name: string;
  age: number;
}[];
```

Type Aliased
```ts
type Person = {
  name: string;
  age: number;
}

let person: Person

let people: Person[];
```

#### Functions & Types

Function can accept types as parameters when we define them. But also because functions are values (First Class Citizens) then the returned value can also have a type that we can set. This can also be set as a union type.

A type that can be returned is void. This is from a function that doesn't return anything and is similar to undefined or null.

```ts
const add = (a: number, b: number): number | string => a + b;

const printer = (value: any) => console.log(value);
// const printer: (value: any) => void
```

#### Generics

If we wanted to create for example a generic helper function like the one below it we lose our type support as the function is expecting any type and doesn't infer anything when we pass it an array of numbers and a number, so calling for example the String.prototype.split method will not error and only show an error at run time.

```ts
const insertAtBegin = (array: any[], value: any) => {
  const newArr = [value, ...array];
  return newArr;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBegin(demoArray, -1);
//  [-1, 1, 2, 3]

updatedArray[0].split('');
// This will now only error at runtime as TS doesn't know that this is an array full of numbers and so any TS support is lost
```

To ensure we get the type support we wan we use generics. This is used with the <> syntax usually with a capital T as convention. Then we use T to say that the arr we are expecting AND the number we are expecting should be of the same type. TS then recognizes and infers these types. They help us write functions that are very flexible but are still type safe.


```ts
const insertAtBegin = <T>(array: T[], value: T) => {
  const newArr = [value, ...array];
  return newArr;
}

const demoArray = [1, 2, 3];
// const demoArray: number[]

const updatedArray = insertAtBegin(demoArray, -1);
// const insertAtBegin: <number>(array: number[], value: number) => number[]

updatedArray[0].split('');
// Error
```

#### Classes & TypeScript

In TS we can define all the properties the class will have in advance as compared to JS where we set them just in the constructor. With TS we can define them ahead of time along with their types. 

We can also control whether a property or method can be public or private.

```ts
class Student {
  // firstName: string;
  // lastName: string;
  // age: number;
  // private courses: string[];
  // We can define the above ahead of time

  constructor(first: string, last: string, age: number, courses: string[]) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.courses = courses;
  }

  enroll(courseName: string) {
    this.courses.push(courseName);
  }

  listCourses() {
    return this.courses.slice();
  }
}

const student = new Student('Cam', 'Remesz', new Date(Date.now()). getFullYear() - 1991, ['Angular', 'TypeScript']);

student.enroll('React');

console.log(student);

console.log(student.courses);
// Error

console.log(student.listCourses());
// Angular, Typescript, React
```

Because the practice of defining the properties before hand is common in Angular you can add modifiers and just do it all in the constructor with public and private properties and methods.

```ts
constructor(
  public firstName: string,
  public lastName: string,
  public age: number,
  private courses: string[]
  ) {}
```

#### Interfaces

Any interface code is only part of TS and so will not be compiled to JS.

Interfaces are similar to types but have an added feature when used with classes. When a class implements an interface that class is then REQUIRED to have the exact properties that the interface defines or it will error. This is useful when working with other developers and for example needed to make sure that that dev implemented a specific method that is needed for that class.

```ts
interface Human {
  firstName: string;
  age: number;

  greet: () => void;
}

let cam: Human;

cam = {
  firstName: 'Cam',
  age: 31,
  greet() {
    console.log('Hi');
  },
}

class Instructor implements Human {
  firstName: string;
  age: number;
  greet() {
    console.log('Hi there!!')
  }
}
```

#### Configuring The Complier

npx tsc

Sometimes you want to compile all the TS files and configure how it behaves. Angular does provide this out of the box so usually you only change this if you really know what your doing.

npx tsc --init

Then we get a tsconfig.json file.


## Angular Basics

ng new my-first-project --no-strict
cd my-first-project
ng serve

Initially we create the project not in strict mode, later the course will dive in optimizations.


Angular is written in Typescript and compiles down to JS.