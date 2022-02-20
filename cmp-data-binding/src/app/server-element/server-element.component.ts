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
