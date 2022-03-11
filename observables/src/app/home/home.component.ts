import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, interval, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customIntObs = new Observable(subscriber => {
      let count = 0;
      setInterval(() => {
        subscriber.next(count);

        if(count === 2) {
          subscriber.complete();
        }

        if(count > 3) {
          subscriber.error(new Error('Count is higher than 3'))
        }

        count++;
      }, 1000);
    });

    


    this.firstObsSubscription = customIntObs.pipe(filter(data => {
      return data > 0;
    }),map((data: number) => {
      return 'Round: ' + (data + 1)
    })).subscribe(data => {
      console.log(data);
    }, error => console.log(error))
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
