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


#### App Loading

The index.html file from the src folder is what's served from the server

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>FirstApp</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

The app-root which is in the app folder is our main app component automatically created by Angular.

In the app.component.ts the app-root is selected using the selector property with the string 'app-root' and the component is configured and rendered. Component configuration is covered later.

In the final index.html file Angular injects script tags for us automatically (We can't see it as it's done automatically afterwards, but can see them when inspecting in the browser). 

The first code executed is in the main.ts file

The bootstrapModule method is starting up our application and it is passed our app module that is imported

main.ts
```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

```

In the app.module.ts file the @NgModule has a bootstrap array which lists all the components that should be known to angular when it analyzes our index.html file

app.module.ts
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Because the app.component was listed in the bootstrap array it now analyzes it and read the component configuration with the app-root and then Angular then knows the app selector and how to handle it in the index.html file.

app.component.ts
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}
```

Angular knows that it should insert the app component which has a template attached to it as defined above. Then the app.component.html is rendered.

index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>FirstApp</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  </head>
  <body>
    <app-root>I'm text that won't be seen because I'm overwritten by Angular at run time</app-root>
  </body>
</html>

```

app.component.html
```html
<h3>I'm in the AppComponent</h3>
```

#### Components

To make our own components we make each component its own folder within the app folder. Here we will make a server folder to mock like we are going to show some info from a server.

We create a server.component.ts file. Components are just TS classes so we export an empty ServerComponent.

Then above our class we use the Component typescript decorator that we imported from the angular core module to configure our component. We give it a selector name that will correspond to what we use in the app.component.html and define the html template which is the path to the server.component.html file.

server.component.ts
```ts
import { Component } from "@angular/core";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
})

export class ServerComponent {

}
```

server.component.html
```html
<h1>Im the server component</h1>
```

Then in our app.module.ts we need to import and declare our new ServerComponent.

app.module.ts
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

And finally add our defined selector for the server component to the app.component.html

app.component.html
```html
<h3>I'm in the AppComponent</h3>
<hr>
<app-server></app-server>
```

#### Create Components From CLI

ng generate component component-name

or 

ng g c component-name

We are going to make a servers component to hold our server (singular) component.

ng g c servers

This automatically creates the folder with all our necessary files (html and ts) pre configured, including a testing and css file.

servers.component.ts
```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
```

Our app module.ts is also automatically updated to contain the new servers component.

app.module.ts
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Then we add it to our app.component.html

app.component.html
```html
<h3>I'm in the AppComponent</h3>
<hr>
<app-servers></app-servers>
```

And then add our server component to our servers component. We use two just to show basic reusability of components.

servers.component.html
```html
<app-server></app-server>
<app-server></app-server>
```

When defining our template in the component, you can also do them inline instead of using an external file if desired. Change the template Url to template and then you can use back ticks and write in your components manually. After a few lines though it's best to use an external file for readability.


```ts
@Component({
  selector: 'app-servers',
  template: `
  <app-server></app-server>
  <app-server></app-server> 
  `,
  styleUrls: ['./servers.component.css']
})
```


The styles can also be used with back ticks and the css will be applied in-line. Both the component styles and styleUrl property is an array as you can multiple stylesheets.


The component selector is a string that is treated sort of like a css selector where you can select by class, element por attribute type, but nothing else. No id selector, pseudo selector etc.


#### Data Binding

Is essentially the communication between our business logic and the view. There are different ways to do this.

Output data
- String interpolation {{ data }}
- Property binding [property] = "data"

User Events
- Event Binding (event)="expression"

In Combination
- Two-Way-Binding [(ngModel)]="data"


#### String Interpolation

This is similar to React where it has to be an expression that evaluates to a string. Flow control and multi line code blocks will not work.

server.component.ts
```ts
import { Component } from "@angular/core";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
})

export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';

  getServerStatus() {
    return this.serverStatus;
  }
}
```

server.component.html
```html
<h1>{{ 'server' }} with Id {{serverId}} is {{getServerStatus()}}</h1>
```

#### Property Binding

There are often times where you can use either property binding OR string interpolation. With experience you get a feel for what to use. 

Here we use property binding on an html button element to bind to the disabled property using the [] syntax to tell angular that is the property we want to bind to. Then in the quotations we can pass an EXPRESSION that evaluates to what is required by that attribute. Ex.) The disabled attribute needs a boolean.

servers.component.ts
```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
   }

  ngOnInit(): void {
  }

}
```

servers.component.html
```html
<button class="btn btn-primary" [disabled]="!allowNewServer">Add Server</button>
<app-server></app-server>
<app-server></app-server>
```


#### Event Binding

We create a method on our class that updates a value. On the button we bind the event using () syntax with the specified DOM event then pass the expression we want to execute in the quotations.

servers.component.ts
```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;

  serverCreationStatus = 'No server was created.'

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
   }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created';
  }

}
```

servers.component.html
```html
<button class="btn btn-primary" [disabled]="!allowNewServer"
(click)="onCreateServer()">Add Server</button>

<p>{{ serverCreationStatus }}</p>

<app-server></app-server>
<app-server></app-server>
```

To pass data with event binding we use a reserved keyword in Angular $event.

First we create a method on our class to call when the input event occurs. 

Then we add an input that gets passed the method which takes in the $event. This way we can get all the event properties like e.target or e.target.value etc.

servers.component.ts
```ts
export class ServersComponent implements OnInit {

  allowNewServer = false;

  serverCreationStatus = 'No server was created.';
  serverName = '';

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
   }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created';
  }

  onUpdateServerName(event: any) {
    this.serverName = event.target.value;
  }

}
```

servers.component.html
```html
<label>Server Name</label>
<input type="text" class="form-control" (input)="onUpdateServerName($event)">

<p>{{ serverName }}</p>
```

#### Two-Way Data Binding

Two way binding is used with the [()] syntax. Here the bottom input using 2 way binding has it's input value already set to Test Server whereas the on using event binding does not. Changing the event bound input will update BOTH the 2 way bound input and the paragraph tag. Updating the event bound input will not show in the event bound input.

servers.component.html
```html
<input type="text" class="form-control" (input)="onUpdateServerName($event)">

<input type="text" class="form-control" [(ngModel)]="serverName">

<p>{{ serverName }}</p>
```

servers.component.ts
```ts
serverName = 'Test Server';
```

#### Directives

Directives are instructions in the DOM. Further in the course there will be deeper learning but to start there are some built in ones to learn. 

There are structural directives and attribute directives. Structural directives can add or remove elements and attribute directives only change the element they were placed on. 

servers.component.ts
```ts
 serverCreated = false;

 onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = 'Server was created Name is ' + this.serverName;
  }
```

The ngIf directive can be used to conditionally render elements. It is used with the * syntax. It is more common to see just an if instead of the if else.

The syntax with the if else defines a template which we put the content we want rendered in the case of the else and is referenced with the # syntax.

servers.component.html
```html
<p *ngIf="serverCreated">Server was created. Server name is {{ serverName }}</p>

<!-- OR to use an if else with ngIf -->

<p *ngIf="serverCreated; else noServer">Server was created. Server name is {{ serverName }}</p>

<ng-template #noServer>
  <p>No server was created!</p>
</ng-template>
```

Here we can us the ngStyle directive and property binding on the directive which we can then pass a js object and define different conditional styling based on a method we define on our class.

server.component.html
```html
<p [ngStyle]="{backgroundColor: getColor()}">{{ 'server' }} with Id {{serverId}} is {{getServerStatus()}}</p>
```


server.component.ts
```ts
serverStatus = 'offline';

constructor() {
  this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
}

getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
```


Here we can use the ngClass directive to set a css class again with property binding and pass it a js object that takes the class name and then the condition on whether or not to activate that class on the element.


server.component.html
```html
<p [ngStyle]="{ backgroundColor: getColor() }"
[ngClass]="{online: serverStatus === 'online'}">
  {{ "server" }} with Id {{ serverId }} is {{ getServerStatus() }}
</p>
```

server.component.ts
```ts
import { Component } from "@angular/core";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online {
      color: white;
    }
  `]
})

export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
```

Here we add a servers array to our class and when creating a server push that server name to the array.

servers.component.ts
```ts
  servers = ['Testserver', 'Testserver 2']

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created Name is ' + this.serverName;
  }

```

Then we us the * syntax because the ngFor is a structural directive not an attribute directive. And in it we use syntax similar to a for of loop to render a server for each server in the array. It's not adding the name or any dynamic content at this time.

servers.component.html
```html
<app-server *ngFor="let server of servers"></app-server>
```


## Debugging

The CLI provides source maps which maps our compiled JS to our TS files. Here we can then use the dev tools to add breakpoints and debuggers by going to the sources tab, going to webpack and the . folder. Inside is our TS files where we can then do normal debugging instead of trying to sift through a compiled JS file trying to find where bugs are happening in our code.


## Components & Data Binding

We can use property and event binding on HTML elements with their native properties and events. We can also use directives (Structural and attribute) to bind to custom properties and events.

With our own components we can also bind to custom property and event binding.


#### Passing Data Down - Property Binding

To pass data down through components we need to explicitly allow those properties to be accessible to other components by using the @Input() decorator.


Here we have the serverElements array in the parent component. And in the html we want to loop over it and pass each looped over element into the element property.

app component
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{type: 'server', name: 'testy', content: 'Test server'}];
}
```

app component
```html
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>

  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="
      let serverEl of serverElements"
      [element]="serverEl"></app-server-element>
    </div>
  </div>
</div>
```

Then when we define the component that we be rendered for each iteration of the loop we import the @Input() decorator and use it to expose the element property by allowing it to accept input from the parent component that is rendering it.

server element
```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

  @Input() element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }

}
```

Then in our html our the child component since we are accepting the input we can access those properties that were passed down.

```html
<div
  class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```

This is similar to passing props in React.

We can alias the property by setting it to whatever we want in the @Input decorator.

```ts
  @Input('srvEl') element: {type: string, name: string, content: string};
```

```html
<app-server-element 
  *ngFor="let serverEl of serverElements"
  [srvEl]="serverEl"></app-server-element>
```

#### Passing Data Up - Event Binding

To inform parents from the child we using event binding.

We have our components listen for a user event of a click on the buttons. Then in the event handler method we define a property using the output decorator that we want our parent to be able to access. We set that property to a new EventEmitter using the <> to define the data type we want to emit as well as using the () to call it as its constructor. Then inside the event handler on the child component we call that property and the emit() method on it with the actual data we want to pass up to the parent.

cockpit component
```html
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <input type="text" class="form-control" [(ngModel)]="newServerName">
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    <br>
    <button
      class="btn btn-primary"
      (click)="onAddServer()">Add Server</button>
    <button
      class="btn btn-primary"
      (click)="onAddBlueprint()">Add Server Blueprint</button>
  </div>
</div>
```

cockpit component
```ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
   @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
   @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    console.log(this.newServerName);
    console.log(this.newServerContent);
    this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }

  onAddBlueprint() {
    console.log(this.newServerName);
    console.log(this.newServerContent);
    this.blueprintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent})
  }
}
```

Then in our parent when we use our child component we use event binding to listen to those event emitters stored inside those created properties and call any method we want from our parent component.

app component
```html
<div class="container">
  <app-cockpit 
  (serverCreated)="onServerAdded($event)"
  (blueprintCreated)="onBlueprintAdded($event)"
  
  ></app-cockpit>
  <hr>

  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="
      let serverEl of serverElements"
      [srvEl]="serverEl"></app-server-element>
    </div>
  </div>
</div>
```

Here we know our methods will be called with the $event data which is our data that we defined to be sent up in the event emitters. We push the object to the array and then our other server component renders it out accordingly.

app component
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{type: 'server', name: 'testy', content: 'Test server'}];

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
}
```

Type Aliasing with the @Output decorator is the exact same as property binding. The event then has the aliased name.

#### View Encapsulation

Angular enforces component style encapsulation with css by default as opposed to the natural behavior of css.

You can over ride this by adding and encapsulation property to the @Component decorator and choose between 3 different modes. By default it is ViewEncapsulation.Emulated. Then there ViewEncapsulation.None which makes any defined styles back to global. ViewEncapsulation.Native uses the shadow dom (the shadow dom is not supported by all browsers).


#### Local References With Templates

Sometimes we don't need to utilize two-way data binding and just need to grab the value at the time of the event.

cockpit component
```html
<!--  Two way data-binding -->
<label>Server Name</label>
<input type="text" class="form-control" [(ngModel)]="newServerName">

<button
class="btn btn-primary"
(click)="onAddServer()">Add Server</button>

<!-- Local Reference -->
<input type="text"
class="form-control" 
#serverNameInput>

<button
class="btn btn-primary"
(click)="onAddServer(serverNameInput)">Add Server</button>
```
Local references use the # syntax and reference the actual html element. They can only be used inside html templates not in typescript code.

We pass the local reference through to our method bound to the click event and then in our TS file we make sure to define the argument type that coming in which is an HTMLInputElement and then we can grab the value off it to use inside our method.  Then we no longer need the newServerName variable that used two-way binding.

cockpit component
```ts
export class CockpitComponent implements OnInit {
   @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
   @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  // newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    console.log(nameInput.value)
    
    this.serverCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent})
  }
}
```

#### Accessing The Template & DOM With @ViewChild

This lets you access the first element with the matching selector in the view DOM. If the view DOM changes and a new child matches the selector, the property is updated.


Note: If you plan on accessing the selected element inside of ngOnInit() you need to use...
```ts
@ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
```
On Angular versions < 9 you need to add static: false

```ts
@ViewChild('serverContentInput', {static: false}) serverContentInput: ElementRef;
```

In our html template we create a local reference using the # syntax.

cockpit component
```ts
import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

 @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    console.log(this.serverContentInput);


    // this.serverCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
  }
  ```

#### Projecting Content With ng-content

By default any content put between a custom components opening and closing tags is stripped out. If we do want to put content in there we can use the ng-content tag in our defined template and then the content we put between the opening and closing tags when using our component will then be display.

app component
```html 
<div class="container">
  <app-cockpit 
  (serverCreated)="onServerAdded($event)"
  (blueprintCreated)="onBlueprintAdded($event)"
  
  ></app-cockpit>
  <hr>

  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="
      let serverEl of serverElements"
      [srvEl]="serverEl">
        <p>
          <strong *ngIf="serverEl.type === 'server'" style="color: red">{{ serverEl.content }}</strong>
          <em *ngIf="serverEl.type === 'blueprint'">{{ serverEl.content }}</em>
        </p>
      </app-server-element>
    </div>
  </div>
</div>
```

server element component
```html
<div
  class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <ng-content>
      
    </ng-content>
  </div>
</div>
```

#### Component Lifecycle


ngOnInit is a lifecycle hook and angular supports a few. Components have different phases (similar to react).

- ngOnChanges 
Executed when a component is created AND every time a bound input property changes (properties decorated with @Input)
- ngOnInit
Called once the component has been initialized i.e. the object has been created  (not necessarily rendered to the DOM and runs AFTER the constructor)
ngDo
- ngDoCheck
Called every time change detection runs (Not if something changed but on EVERY check)
- ngAfterContentInit
Called after content (ng-content) has been projected into the view (The view of the parent component)
- ng After ContentChecked
Called every time projected content is checked
- ngAfterViewInit 
Called after the components view (and child's view) has been initialized
- ngAfterViewChecked 
Called every time the view (and child's view) have been checked
- ngOnDestroy
Called right before the object is destroyed by Angular (great for clean up work)


The life cycle methods in the code are used on the server element component with buttons in the app component template that alter the server elements array that is passed down to the server elements component.

Any life cycle hook needs to be imported from angular and it's interface should be added to the implements list.

Note: The only life cycle hook that accepts an argument is the ngOnChanges, which will track changes to @Input properties that have changed inside that component. So here since only the name is changed that is all that is tracked as the type & content are actually rendered through the ng-content in the app component.

server elements component
```ts
import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input('srvEl') element: {type: string, name: string, content: string};

  @Input() name: string;

  constructor() {
    console.log('constructor')
   }

  ngOnChanges(changes: SimpleChanges) {
  console.log('ngonchanges');
  console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngoninit');
  }

  ngDoCheck() {
    console.log('ngdocheck ++')
  }

  ngAfterContentInit() {
    console.log('ngaftercontentinit');
  }

  ngAfterContentChecked() {
    console.log('ngaftercontentchecked');
  }

  ngAfterViewInit() {
    console.log('ngafterviewinit');
  }

  ngAfterViewChecked() {
    console.log('ngafterviewchecked');
  }

  ngOnDestroy() {
    console.log('Destroy!!!')
  }

}
```

## Observables

Observables:
Are data sources. It is an object imported from RxJs.

We have an observable and an observer and in between we have a stream or timeline. And on the timeline we can have multiple events emitted by the observable (little data packages).

It can emit data because we tell it to, or when a user event happens or like the angular http request, when the data returns the event is emitted.

The observer is YOUR code. This includes the subscribe funtion.
We can write code for 3 instances: 
- Handle the data 
- Handle the Error
- Handle the completion of the observable

Observables DO NOT need to complete. Ex.) An observable hooked up to a button are always hooked up. An http observable WILL eventually complete.

We use observables to handle async tasks because we dont know when they will happen or how long they will take.

Observable have a big advantage called operators (explained later).

You can set up a subscriber to routing with route params for when the url parameters change.

```ts
import { ActivatedRoute, Params } from 'angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit(){
  this.route.params.subscribe(next: (params: Params) => {
    this.id = +=params.id;
  })
}
```

Observables are constructs to which we subscribe to be informed about changes in data and our subscriptions will know about it.

Observables are from the rxjs library.


Observables don't necessarily stop emitting values when your not interested in them anymore. On this component we log an interval counting up every second. So when we leave the home page where the home page component is rendered the observable is still running. When we navigate back to the home page ANOTHER observable is created. Then we have 2 timers. This quickly causes a memory leak, uses up resources and slows our applications. So we should store our subscriptions and cancel them when we're done with them.

```ts
import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Working')
    interval(1000).subscribe( count => {
      console.log(count);
    })
  }

}
```

We import Subscription from rxjs and store our subscription in a variable then using the lifecycle hook OnDestroy that we import, we cancel the subscription when we navigate away from the home page (kinda like component will or did unmount)

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    console.log('Working')
    this.firstObsSubscription = interval(1000).subscribe( count => {
      console.log(count);
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
```

With observables provided by Angular they are managed by angular and we do not need to unsubscribe manually.

#### A Custom Observable

We import the Observable from rxjs and call the create method to create an observable. Which gets the observer, which is the listener for the observable and we can define what it needs to do when data is emitted. Here we replicate the built in interval from rxjs manually.

We create a count, set an interval that will call the observers next method (There are a few method we can use on the observer for handling data, errors or completion) where we pass in the count, and then increment the count every second. 

Then we make sure we store or subscription to unsubscribe.

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    console.log('Working')
    // this.firstObsSubscription = interval(1000).subscribe( count => {
    //   console.log(count);
    // })

    const customObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000)
    });

    this.firstObsSubscription = customObservable.subscribe((data) => {
      console.log(data);
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
```

When an observable throws an error it is finished and you do not need to unsubscribe.

```ts
const customIntObs = new Observable(subscriber => {
      let count = 0;
      setInterval(() => {
        subscriber.next(count);

        if(count > 3) {
          subscriber.error(new Error('Count is higher than 3'))
        }

        count++;
      }, 1000);
    });


    this.firstObsSubscription = customIntObs.subscribe(data => {
      console.log(data);
    }, error => console.log(error),
    () => {
      console.log('Completed')
    })
```

To handle the thrown error we write the error handling function int the subscribe method.


When an observable completes no other values are emitted. If we want to do something when it completes we write our complete function in the subscribe method. No need to unsubscribe from a completed observable. The complete function takes not arguments and is useful for clean up work. Complete does not fire when an error is thrown.


#### Operators

Operators:

We have an observable and an observer and in between we set up the subscription. There are built in operators that can sit in between this still in between BEFORE we set up our subscription and the observable. This can alter the data before the subscription gets the data. These operators come from rxjs.

These can be used with the pipe() method which every observable gets.

We need to make sure we put it IN FRONT of our subscription.


```ts
import { map } 'rxjs/operators'

this.firstObsSubscription = customObservable.pipe(map(data => {
  return 'Round: ' + (data + 1)
})).subscribe((data) => {
      console.log(data);
    })
```

Pipe can be passed as many operators as need to transform our data prior to our subscribe method getting it.

```ts
this.firstObsSubscription = customIntObs.pipe(filter(data => {
      return data > 0;
    }),map((data: number) => {
      return 'Round: ' + (data + 1)
    })).subscribe(data => {
      console.log(data);
    }, error => console.log(error))
```

#### Subjects

Subjects are a special kind of Observable that are more active. Whereas regular observables are more passive subjects are active. This means we can call the next() method on them and force them to emit data from outside. 

The concept is similar to an Event Emitter but it is like and Observable Event Emitter because we can force this special observable to emit when we want it to.

We saw the next() method when building our custom observable that we could then consume in the observer handler function. These should replace event emitters ONLY WHEN COMMUNICATING CROSS COMPONENT USING SERVICES (not regular event emitters using the @Output decorator), are more efficient and can also use pipe on them as they are technically a type of observable.

Remember to store and unsubscribe from Subjects subscription to prevent memory leaks.

We create Subjects the same way as we create custom Observables.

```js
const subject = new Subject();

subject.subscribe({
  next(value) {
    // Custom code
    console.log(value);
  },
  complete(value) {
    // Custom code
  },
  error(error) {
    // Custom code
  }
})

subject.next('Forced emit')
// Forced emit
```

We can call this next method when ever we want. Ex.) A user clicks, or after a certain time etc. We control when something happens.


## RxJS

Think of RxJS as Lodash but for events.

The operators are what make RxJS so powerful. RxJS is pretty much a funnel that we can use a huge amount of built in operators to perform actions on asynchronous code like events and the data they are emitting AND chain as many operators as we need.

#### Observables, Observers & Subscriptions

- Observables are streams of data.
- Observers execute code when data is emitted, when there is an error or when the Observable emits that it is done (next, error, complete methods)
- The connection between the two is set up using a Subscription. (subscribe method)

There are many RxJS methods that automatically create these observables for use to subscribe to.

The essential concepts in RxJS which solve async event management are:

Observable: 
- represents the idea of an invokable collection of future values or events.

Observer: 
- is a collection of callbacks that knows how to listen to values delivered by the Observable.

Subscription: 
- represents the execution of an Observable, is primarily useful for cancelling the execution.

Operators: 
- are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.

Subject: 
- is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.

Schedulers: 
- are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

Make sure to unsubscribe and clean up to prevent memory leaks. Do this by storing the subscription (which is the result of calling subscribe() on the observable) to the observable in a variable. Then calling unsubscribe() when you want to unsubscribe.

Observables are lazy Push collections of multiple values. They are not the same as Event Emitters. They can behave like them when being multicasted with RxJS Subjects, but it is not common for them to act like this. Two Observable subscribes will cause the Observable to run twice. This differs from Event Emitters which share side effects and have eager execution regardless of the existence of subscribers. Observables have no shared execution and are lazy.

Subscribing to an Observable is analogous to calling a Function.

Observables differ from event handler APIs like addEventListener and removeEventListener. With observable.subscribe, the given Observer is not registered as a listener in the Observable. The Observable does not even maintain a list of attached Observers.


You can create a custom unsubscribe function when working with custom observables. Used for doing specific clean up AND unsubscribing.

```js
const observable = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```

#### Observables to Promises

The similarity between Observables and Promises is that both collections may produce values over time, but the difference is that Observables may produce none or more than one value, while Promises produce only one value when resolved successfully.

To convert a promise into observable we can use the from() method to wrap the returning promise which we then call the .pipe() method on with the map operator.

Below shows how to manually convert a promise into an observable. If we are doing anf http request though RxJS has a built in fromFetch function that does it automatically
[fromFetch](https://rxjs.dev/api/fetch/fromFetch)

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';

function getTodo() {
  return from(fetch(url))
    .pipe(map(response => response.json()));
}

getTodo().subscribe(console.log);
```

Keep in mind some promises may still be hanging around and will need to be dealt with. For example in the case of an http promise above, if the subscription is removed...

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';

function getTodo() {
  return from(fetch(url))
    .pipe(map(response => response.json()));
}

getTodo();
```

... the http call still happens.

We can solve this by either using an existing rxjs operator like defer, in combination with the from operator we're already using or you can decide to build the observable from scratch.

```js
function getTodo() {
  return defer(() => from(fetch(url)));
}

const getTodo$ = getTodo();

// 
setTimeout(() => {
  getTodo$.subscribe();
}, 5000);
```

Or building ourselves

```js
function getTodo() {
  return new Observable(observer => {
    return from(fetch(url)).subscribe(observer);
  });
}

const getTodo$ = getTodo();

setTimeout(() => {
  getTodo$.subscribe();
}, 5000);

```

The above code will create an observable based on the promise and only subscribe to it after 5000 ms. The HTTP call is only triggered after 5 seconds. So our observable is now lazy in such a way that it will only resolve the promise (and trigger the HTTP call) when a subscription is added.

Note that we are adding an explicit subscription which we're returning from the Observable's constructor callback as the teardown logic. Doing so ensures that that subscription is cleanup whenever we unsubscribe from the observable returned by getTodo().

We're still missing one crucial part in our Promise to Observable conversion. In our case, the promise was representing an HTTP call. Whenever we unsubscribe from the observable before the HTTP call is finished, we probably want to abort the open HTTP request.



```js
function getTodo() {
  return new Observable(observer => {
    const abortController = new AbortController();
    const subscription = from(fetch(url, {
      signal: abortController.signal
    })).subscribe(observer);

    return () => {
      abortController.abort();
      subscription.unsubscribe();
    }
  });
}

const getTodo$ = getTodo();

setTimeout(() => {
  const sub = getTodo$.subscribe();
  sub.unsubscribe();
}, 5000);
```

## Understanding Directives

#### Creating Custom Directives

we create a basic-highlight folder and create a basic-highlight.directive.ts file and inside put our directive class.

We import our @Directive decorator so we can configure our directive. We set a selector and use [] syntax to show that we want to target that attribute on any given element, so when we add it in our html template we just put it on an element like a regular attribute without the [].

Then we want to pass in the element reference to the constructor and give it an ElementRef type also giving it a private modifier so it is automatically set as a property on our class on instantiation.

And in our ngOnInit hook we select the style of the native element to change it.

basic-highlight.directive.ts
```ts
import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: '[appBasicHighlight]'
})

export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
```

Then we set the directive on our element.

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button
        class="btn btn-primary"
        (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <li
          class="list-group-item">
        </li>
      </ul>


      <p appBasicHighlight>Custom directive</p>


    </div>
  </div>
</div>
```

Accessing element directly like this is not a good practice.

#### Renderer

Directives can also be created through the CLI.

ng g d directive-name --skip-tests

Angular is not limited to running in the browser. It also works with service works. These are environments where we may not have access to the DOM. So accessing the DOM directly accessing the nativeElement and the style of that element, you can get errors. So it is better practice to use the renderer for DOM access with it's provided methods.

better-directive
```ts
import { Directive, Renderer2, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
  }
}
```

```html
<p appBetterHighlight>Better directive</p>
```

#### HostListener

We can use the @HostListener decorator which takes a DOM even and then we provide a custom named function to execute on that event (The custom method also gets the event data, which we can use for custom events).

So here we update the style of our p tag in the template via the directive and host listener on the mouse events

better-directive
```ts
import { Directive, Renderer2, OnInit, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {
  
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    console.log(eventData);
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    console.log(eventData);
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent')
  }
}
```

#### Host Binding

An alternative to the renderer is to use Host Binding  where we use the host binding decorator to access the attribute (in this case style, but we can bind to ANY property that we're sitting on) and then we create a property on the class holding that value and change it as we need. In this case on the mouse enter and mouse leave events within the host listeners.

```ts
import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {

  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // console.log(eventData);
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')

    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // console.log(eventData);
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent')

    this.backgroundColor = 'transparent';
  }
}

```


#### Binding To Directive Properties

We can make this even more reusable by adding property binding with allowing the directive to accept inputs that we add to the element that the directive is on.

We set a default color to be passed in as well as a highlight color

```ts
import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {

  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  @HostBinding('style.backgroundColor') backgroundColor: string;
  
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')

    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // console.log(eventData);
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')

    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // console.log(eventData);
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent')

    this.backgroundColor = this.defaultColor;
  }
}
```

```html
<p appBasicHighlight>Custom directive</p>
<p appBetterHighlight [defaultColor]="'blue'" [highlightColor]="'yellow'">Better directive</p>
```


#### Custom Structural Directive

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if(!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

}
```

```html
<ul class="list-group">
  <li
    class="list-group-item">
  </li>
  <li *appUnless="onlyOdd">Unless custom structural directive</li>
</ul>
```

#### ngSwitch

Very similar to a switch statement in vanilla JS. Just look it up, it's easy to figure out.


## Services

With services we do not instantiate them manually. Angular provides dependency injections as a tool for us to do this.

Angular create and instantiates our components with our selector names we write in out html templates ex.) app-new-account. And the way we create reusable services in Angular we stay within the tools angular provides instead of manually instantiating our services. We export our service as a regular class and import it to our component where we want to use it. Then we pass it to the constructor so when the app component is created angular automatically creates an instance of our service on the component as a property using the private modifier.

Now angular knows we want an instance of that service. Now we need to tell angular how to give us such an instance or how to create it, which is simple. We add it as a provider to this component by adding a providers array in the @Component decorator. Now we can inject our service in any component where we want to use our service.

logging service
```ts
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status changed, new status ' + status);
  }
}
```

new account component
```ts
import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})

export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService) {

  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });

    this.loggingService.logStatusChange(accountStatus);
  }
}

```

Services have heirarchical injection so any component that has the service injected share the same instance of the service as all of its children.

Any instances of services inherited from parent components ARE OVERWRITTEN if the service is additionally injected into the child component.

If you need the same instance on children as well as parent and don't want to overwrite the parents instance REMOVE THE SERVICE FROM THE CHILD COMPONENT PROVIDERS ARRAY.

#### Injecting Services Into Services

The highest possible level for services is in the app.module. This way we can ensure all components receive the same instance of the service unless a child component overwrites it.

In Angular 6+ to provide application wide services  just type...
```ts
@Injectable({providedIn: 'root'})
export class MyService { ... }
```
As opposed to 
```ts
export class MyService { ... }
```

```ts
import { MyService } from './path/to/my.service';
 
@NgModule({
    ...
    providers: [MyService]
})
export class AppModule { ... }
```

To use a service inside another service we inject it in the constructor. If we inject a service into something ex.) another service, we need to give that something some metadata with the @Injectable decorator. This tells angular that something can be injected into that service. It goes on the thing getting injected into or the receiving thing.

In newer versions of angular it's recommended to just add the @Injectable decorator regardless.

#### Services For Cross Component Communication

You can create an event emitter on the service and then use it to emit in one component, passing it data from that component and then in another component subscribe to that custom event to get the data from the other component.


## Pipes

#### Basic Usage

We can use built in pipes for data transformations on the output, leaving the original data unmutated.

Pipes can be configured. Check their option in the documentation. Configuration is done by using the : syntax and passing the config values as strings.

Pipes can be chained by adding multiple pipes. Sometimes order matters, so be careful.

```html
<li
  class="list-group-item"
  *ngFor="let server of servers"
  [ngClass]="getStatusClasses(server)">
  <span
    class="badge">
    {{ server.status }}
  </span>
  <strong>{{ server.name }}</strong> |
  {{ server.instanceType | uppercase }} |
  {{ server.started | date:'fullDate' }}
</li>
```


#### Custom Pipes

We create a pipe by importing the pipe decorator to give it its name that we want to use in our template. The pipe transform interface ensures we implement a transform method on a value and return an output.

Make sure we add the pipe to the app module decorations array.

Then define the custom logic we want to happen. This pipe rips out the first letter of every word except the last, upper cases it and puts it together as an acronym and appends the last word in uppercase.


```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any){
    const wordsArray = value.split(" ");
    const lastWord = wordsArray.pop();
    const acronyms = wordsArray.map(word => word.slice(0, 1)).join("");
    return `${acronyms.toUpperCase()} ${lastWord.toUpperCase()}`;
  }
}
```

Then use with the given name we defined in the pipe decorator.

```html
<li
  class="list-group-item"
  *ngFor="let server of servers"
  [ngClass]="getStatusClasses(server)">
  <span
    class="badge">
    {{ server.status }}
  </span>
  <strong>{{ server.name | shorten }}</strong> |
  {{ server.instanceType | uppercase }} |
  {{ server.started | date:'fullDate' }}
</li>
```

If we want or need more parameters we just add them to the parameter list and build our code as required. Then we pass arguments with our colon syntax in our template.

Ex.) shorten:5:12


#### async Pipe

The async pipe can be used with promises to show the resolved value when the async task returns. AND it can be used with observables to which it automatically subscribes

## Routing

We add routing by adding the routes type and router module to the app.module. (Or you can create a routing module and import it into here for more modularity - see previous course sections). Then define the routes and desired component to render. and use the forRoot method to render the routes. Then add the router-outlet component i nthe app to render components based on url path.

```ts
import { Routes, RouterModule } from '@angular/router';

// ...
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/:id', component: UserComponent},
  { path: 'servers', component: ServersComponent}
]

// ...

imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],

```

We add routerLinks to change the url path without reloading the page. Keeping in mind using / will be an absolute path starting from the root, ommitting it will be a relative path to whatever page url your on. ./ will be on that level and ../ will go up a level just like regular file systems.

We can add the routerLinkActive to apply a class to any active route from being clicked (you can put it on a wrapping element like the li, which in this case is mandatory cause bootstrap overrides styling on the a tag)

We can provide routerLinkOptions with aJS object to set exact to true so the home link will only show when it is active not all the time

The routerLink can also be set as property binding and then we pass it an array that is more configurable for more complex routing and paths as we will learn soon.


```html
<li role="presentation"
  routerLinkActive="active"
  [routerLinkActiveOptions]="{exact: true}"
  >
  <a routerLink="/">Home</a>
</li>
<li role="presentation" routerLinkActive="active">
  <a routerLink="/servers">Servers</a>
</li>
<li role="presentation" routerLinkActive="active">
  <a [routerLink]="['users']">Users</a>
</li>
```

In the components we can also navigate programmatically by injecting the router and current route into the component and using the routers navigate method and the current route anywhere we need it and even pull params off it as we will learn.

```ts
import { Router, ActivatedRoute } from '@angular/router';

// ...
constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

// ...

onReload() {
  this.router.navigate(['servers'], {relativeTo: this.route})
}
```

We can pull off information from the params as we need using a snapshot.

```ts
ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }

    this.route.params.subscribe((params: Params) => {
      this.user.id = params.id;
      this.user.name = params.name;
    })
  }
```

We can add more complex routing with making a link push a new path to our URL, however the content wouldn't be updated as we would want just using the snapshot, because the component doesn't re render.

We can use the route.params observable and subscribe to changes to our url params and update our components properties live.

If we know our component will be rerendered every time it is visited we can use the snapshot otherwise we will need to use the params observable.

```html
<p>User ID is {{ user.id }}</p>
<p>User name is {{ user.name }}</p>
<hr>
<a [routerLink]="['/users', 10, 'Anna']">Load Anna 10</a>
```
