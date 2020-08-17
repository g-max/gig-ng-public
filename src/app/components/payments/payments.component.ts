import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  fromEvent,
  combineLatest,
  Subscription
} from 'rxjs';

import { map, take } from 'rxjs/operators';

import { PaymentsProcessingService } from '../../services/payments-processing.service';
import { CodeService } from '../../services/code.service';
import { GeneratorService } from '../../services/generator.service';

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

  sub: Subscription = null;

  @ViewChild('addPaymentBtn') addPaymentBtn: ElementRef;

  constructor(
    private codeService: CodeService,
    private generatorService: GeneratorService,
    private paymentsProcessingService: PaymentsProcessingService
  ) { }

  ngAfterViewInit() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }

    this.sub = combineLatest(
      this.codeService.code$,
      this.generatorService.generatedMatrix$,
      fromEvent(this.addPaymentBtn.nativeElement, 'click'),
    ).pipe(
      map(
        ([code, matrix]) => {
          console.log('payments component: ', code, matrix);
          this.matrix = Object.assign({}, matrix);
          this.code = code;
          this.paymentsProcessingService.savePayments(this.payments);
        }
      )
    ).subscribe();
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
