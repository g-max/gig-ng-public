import { Injectable } from '@angular/core';
import { GeneratorService } from './generator.service';
import { TimerService } from './timer.service';
import { BehaviorSubject, Subscription } from 'rxjs';

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

    this.timerSub = this.timerService.secondsArray$.subscribe(
      seconds => {

        console.log(this.generatorService.generatedMatrix$.observers);
        this.generateCode(seconds, this.generatorService.generatedMatrix$.value);
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

    this.code$.next(`${firstCharOccurrencesNum}${secondCharOccurrencesNum}`);
  }

}
