import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Chance } from 'chance';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  readonly matrixWidth = 10;

  readonly martrixHeight = 10;

  private readonly charDictionary = 'abcdefghijklmnopqrstuvwxyz';

  private readonly preferredCharWeight = 0.2;

  // probability of other characters when preferred char is defined
  // (100% - 20%) divided between 25 characters that left
  private readonly nonPreferredCharWeight = (1 - this.preferredCharWeight) / (this.charDictionary.length - 1);

  private generatedMatrix: string[][];

  generatedMatrix$ = new BehaviorSubject<string[][]>(this.generatedMatrix);

  private preferredChar = ' ';

  secondsArrSub: Subscription = new Subscription();

  timerSub: Subscription = new Subscription();

  constructor(
    private timerService: TimerService
  ) {
    this.generatedMatrix = new Array(this.matrixWidth).fill('').map(
      _ => new Array(this.martrixHeight).fill('')
    );
    this.generatedMatrix$.next(this.generatedMatrix);
  }

  subscribeToTimer() {
    this.unsubscribeFromAll();

    this.timerSub = this.timerService.timer$.subscribe();

    this.secondsArrSub = this.timerService.secondsArray$.subscribe(
      _ => this.generateRandomMatrix()
    );
  }

  generateRandomMatrix() {
    const chanceObj = new Chance();
    const preferredCharPos = this.charDictionary.indexOf(this.preferredChar);

    this.generatedMatrix.forEach((row, rowIdx) => {
      row.forEach((_, colIdx) => {

        if (!this.preferredChar) {
          this.generatedMatrix[rowIdx][colIdx] = chanceObj.character({ alpha: true, casing: 'lower' });
          return;
        }

        const weightsArray = new Array(this.charDictionary.length).fill(this.nonPreferredCharWeight);
        weightsArray[preferredCharPos] = this.preferredCharWeight;
        this.generatedMatrix[rowIdx][colIdx] = chanceObj.weighted(
          this.charDictionary.split(''),
          weightsArray
        );
      });
    });

    this.generatedMatrix$.next(this.generatedMatrix);
  }

  setPreferredChar(preferredChar) {
    this.preferredChar = preferredChar;
  }

  private unsubscribeFromAll() {
    if (this.secondsArrSub) {
      this.secondsArrSub.unsubscribe();
      this.secondsArrSub = null;
    }

    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

}
