import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { timer,  Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timer$: Observable<number> = new Observable();

  secondsArray$: Subject<string[]> = new Subject();

  private timerInterval = 20 * 1000;

  constructor() {
  }

  startTimer() {
    this.timer$ = timer(0, this.timerInterval).pipe(tap(
      _ => {
        this.secondsArray$.next(moment().format('ss').split(''));
      }
    ));
  }
}
