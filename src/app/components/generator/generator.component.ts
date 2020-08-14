import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

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
    this.generatedArray = this.generatorService.generatedMatrix$;
    this.codeService.code$.subscribe(
      code => this.code = code
    );
  }

  generateGrid() {
    this.timerService.startTimer();
    this.generatorService.setPreferredChar(this.char);
    this.generatorService.subscribeToTimer();
    this.codeService.subscribeToTimer();
    this.matrixGenerated = true;
  }

  onPreferredCharBlur() {
    this.generatorService.setPreferredChar(this.char);
  }
}
