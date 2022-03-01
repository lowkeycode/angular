import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  signOuts: number = 0;
  signIns: number = 0;

  constructor() { }

  onSignInCount() {
    this.signIns++;
  }

  onSignOutCount() {
    this.signOuts++;
  }
}
