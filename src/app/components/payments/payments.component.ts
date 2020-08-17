import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  fromEvent,
  combineLatest,
  Subscription,
} from 'rxjs';

import { map, distinctUntilChanged, tap } from 'rxjs/operators';

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

  codeGeneratorSub: Subscription = null;

  @ViewChild('addPaymentBtn') addPaymentBtn: ElementRef;

  constructor(
    private codeService: CodeService,
    private generatorService: GeneratorService,
    private paymentsProcessingService: PaymentsProcessingService
  ) { }

  ngAfterViewInit() {
    if (this.codeGeneratorSub) {
      this.codeGeneratorSub.unsubscribe();
      this.codeGeneratorSub = null;
    }

    this.codeGeneratorSub = combineLatest(
      this.codeService.code$,
      this.generatorService.generatedMatrix$,
      fromEvent<MouseEvent>(this.addPaymentBtn.nativeElement, 'click'),
    ).pipe(
      distinctUntilChanged(
        ([codeBefore, matrixBefore, eventBefore], [codeAfter, matrixAfter, eventAfter]) =>
          eventBefore.timeStamp === eventAfter.timeStamp
      ),
      map(
        ([code, matrix]) => {
          if (!(code && matrix)) {
            return;
          }
          this.matrix = Object.assign({}, matrix);
          this.code = code;

          this.addPayment();
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
