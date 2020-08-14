import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { GeneratorService } from '../../services/generator.service';
import { TimerService } from '../../services/timer.service';
import { CodeService } from 'src/app/services/code.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  generatedArray: BehaviorSubject<string[][]>;

  char = '';

  code = '';

  matrixGenerated = false;

  timerSubscription: Subscription = new Subscription();

  constructor(
    private generatorService: GeneratorService,
    private timerService: TimerService,
    private codeService: CodeService
  ) { }

  ngOnInit() {

  }

  generateGrid() {
    this.generatorService.setPreferredChar(this.char);
    this.timerService.startTimer();
    this.generatorService.subscribeToTimer();
    this.codeService.subscribeToTimerAndGenerator();
    this.matrixGenerated = true;
  }

  onPreferredCharBlur() {
    this.generatorService.setPreferredChar(this.char);
  }

}
