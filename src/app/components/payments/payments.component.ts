import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { fromEvent, combineLatest, Subscription } from 'rxjs';
import { CodeService } from 'src/app/services/code.service';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements AfterViewInit {

  payment = '';

  amount = null;

  matrix: string[][];

  code = '';

  payments: { payment: string, amount: number, code?: string, matrix?: any }[] = [];

  sub = new Subscription();

  @ViewChild('addPaymentBtn') addPaymentBtn: ElementRef;

  constructor(
    private codeService: CodeService,
    private generatorService: GeneratorService
  ) { }

  ngAfterViewInit() {
    this.sub = combineLatest(
      this.codeService.code$,
      this.generatorService.generatedMatrix$,
      fromEvent(this.addPaymentBtn.nativeElement, 'click'),
    ).subscribe(
      ([code, matrix]) => {

        console.log('payments component: ', code, matrix);
        this.matrix = Object.assign({}, matrix);
        this.code = code;
      }
    );
  }

  addPayment() {
    this.payments.push({
      payment: this.payment,
      amount: this.amount,
      code: this.code,
      matrix: this.matrix
    });
  }
}
