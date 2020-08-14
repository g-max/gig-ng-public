import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chance } from 'chance';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private readonly matrixWidth = 10;

  private readonly martrixHeight = 10;

  private readonly charDictionary = 'abcdefghijklmnopqrstuvwxyz';

  private readonly preferredCharWeight = 0.2;

  // probability of other characters when preferred char is defined
  // (100% - 20%) divided between 25 characters that left
  private readonly nonPreferredCharWeight = (1 - this.preferredCharWeight) / (this.charDictionary.length - 1);

  private generatedMatrix: string[][];

  generatedMatrix$ = new BehaviorSubject<string[][]>(this.generatedMatrix);

  constructor() {
    this.generatedMatrix = new Array(this.matrixWidth).fill('').map(
      _ => new Array(this.martrixHeight).fill('')
    );

    this.generatedMatrix$.next(this.generatedMatrix);
  }

  generateRandomMatrix(preferredChar?: string) {
    const chanceObj = new Chance();
    const preferredCharPos = this.charDictionary.indexOf(preferredChar);
    this.generatedMatrix.forEach((row, rowIdx) => {
      row.forEach((_, colIdx) => {

        if (!preferredChar) {
          this.generatedMatrix[rowIdx][colIdx] = chanceObj.character({ alpha: true, casing: 'lower' });
          return;
        }

        const weghtsArray = new Array(this.charDictionary.length).fill(this.nonPreferredCharWeight);
        weghtsArray[preferredCharPos] = this.preferredCharWeight;
        this.generatedMatrix[rowIdx][colIdx] = chanceObj.weighted(
          this.charDictionary.split(''),
          weghtsArray
        );
      });
    });

    this.generatedMatrix$.next(this.generatedMatrix);
  }

}
