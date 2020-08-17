import { Component } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { GeneratorService } from '../../services/generator.service';
import { TimerService } from '../../services/timer.service';
import { CodeService } from 'src/app/services/code.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent {

  generatedArray: BehaviorSubject<string[][]>;

  char = '';

  code = '';

  matrixGenerated = false;

  timerSubscription: Subscription = new Subscription();

  inputCharacterDisabled = true;

  constructor(
    private generatorService: GeneratorService,
    private timerService: TimerService,
    private codeService: CodeService
  ) { }

  generateGrid() {
    this.generatorService.setPreferredChar(this.char);
    this.timerService.startTimer();
    this.generatorService.subscribeToTimer();
    this.codeService.subscribeToTimerAndGenerator();
    this.matrixGenerated = true;
    this.inputCharacterDisabled = false;
  }

  onPreferredCharChange() {
    this.generatorService.setPreferredChar(this.char);
    this.inputCharacterDisabled = true;
    setTimeout(() => this.inputCharacterDisabled = false, 4000);
  }

}
