import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-test',
  templateUrl: './input-test.component.html',
  styleUrls: ['./input-test.component.css']
})
export class InputTestComponent implements OnInit {

  
  userName = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  onUpdateUserName (event: any) {
    this.userName = event.target.value
  }

  resetUserName() {
    this.userName = '';
  }

}
