import { Injectable } from '@angular/core';
import { GeneratorService } from './generator.service';
import { TimerService } from './timer.service';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  code$: BehaviorSubject<string> = new BehaviorSubject('');

  timerSub = new Subscription();

  constructor(
    private generatorService: GeneratorService,
    private timerService: TimerService
  ) {  }


  subscribeToTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }

    combineLatest(
      this.timerService.secondsArray$,
      this.generatorService.generatedMatrix$
    ).subscribe(
      ([v1, v2]) => {
        return console.log(v1, v2);
      }
    );

    // this.timerSub = this.timerService.secondsArray$.subscribe(
    //   seconds => this.generateCode(seconds)
    // );
  }

  generateCode(positions) {
    const firstChar = this.generatorService.generatedMatrix$.value[positions[0]][positions[1]];
    const secondChar = this.generatorService.generatedMatrix$.value[positions[1]][positions[0]];

    let firstCharOccurrencesNum = 0;
    let secondCharOccurrencesNum = 0;

    this.generatorService.generatedMatrix$.value.forEach(row => row.map(
      el => {
        if (el === firstChar) { firstCharOccurrencesNum++; }
        if (el === secondChar) { secondCharOccurrencesNum++; }
      }
    ));

    console.log('code service occurences: ', `${firstCharOccurrencesNum}${secondCharOccurrencesNum}`);
    this.code$.next(`${firstCharOccurrencesNum}${secondCharOccurrencesNum}`);
  }

}
