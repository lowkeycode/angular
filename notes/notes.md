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

















<!--! CONTINUE WITH COURSE NOTES ABOVE UNTIL OBSERVABLE SECTION THEN CONTINUE BELOW -->

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

We use observables to handle async tasks beacuase we dont know when they will happen or how long they will take.

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

Operators:

We hav an observable and an observer and in between we set up the subscription. There are built in operators that can sit in between this still in between BEFORE we set up our subscription and the observable. This can alter the data before the subscription gets the data. These operators come from rxjs.

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

