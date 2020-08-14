import { Injectable } from '@angular/core';
import { GeneratorService } from './generator.service';
import { TimerService } from './timer.service';
import { Subject, Subscription, combineLatest } from 'rxjs';
import { skip, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  code$: Subject<string> = new Subject();

  timerSub = new Subscription();

  constructor(
    private generatorService: GeneratorService,
    private timerService: TimerService
  ) {  }

  subscribeToTimerAndGenerator() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }

    this.timerSub = combineLatest(
      this.timerService.secondsArray$,
      this.generatorService.generatedMatrix$
    ).subscribe(
      ([seconds, martrix]) => {
        this.generateCode(seconds, martrix);
      }
    );
  }

  generateCode(positions, matrix) {
    const firstChar = matrix[positions[0]][positions[1]];
    const secondChar = matrix[positions[1]][positions[0]];

    let firstCharOccurrencesNum = 0;
    let secondCharOccurrencesNum = 0;

    matrix.forEach(row => {
      row.forEach(el => {
        if (el === firstChar) { firstCharOccurrencesNum++; }
        if (el === secondChar) { secondCharOccurrencesNum++; }
      });
    });


    console.log(firstCharOccurrencesNum, secondCharOccurrencesNum);
    firstCharOccurrencesNum = this.lowerNumber(firstCharOccurrencesNum);
    secondCharOccurrencesNum = this.lowerNumber(secondCharOccurrencesNum);
    this.code$.next(`${firstCharOccurrencesNum}${secondCharOccurrencesNum}`);
  }

  private lowerNumber(num) {
    if (num < 10) { return num; }
    if (num >= 10 && num < 100) { return Math.floor(num / 10); }
    if (num === 100) { return Math.floor(num / 100); }
  }

}
