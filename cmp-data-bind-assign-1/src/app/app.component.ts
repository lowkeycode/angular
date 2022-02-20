import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentCount: number = 0;

  onCountStarted(event) {
    console.log(event);
    this.currentCount = event;
  }

}
