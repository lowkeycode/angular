import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  showDetails = false;

  log: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onToggleDetails() {
    this.showDetails = !this.showDetails;

    this.log.push(this.log.length + 1);
  }

}
