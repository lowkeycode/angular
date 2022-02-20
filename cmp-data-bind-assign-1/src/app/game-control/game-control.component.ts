import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  counterId;
  counter: number = 0;

  @Output() count = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onStartCount() {
    if(this.counterId) return;

    this.counterId = setInterval(() => {
      this.counter++;
      this.count.emit(this.counter);
    }, 1000)
  }

  onStopCount() {
    clearInterval(this.counterId);
  }

}
