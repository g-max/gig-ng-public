import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsProcessingService {

  payments: { payment: string, amount: number, code: string, matrix: string[][] }[] = [];

  payments$: BehaviorSubject<
    { payment: string, amount: number, code: string, matrix: string[][] }[]
  > = new BehaviorSubject(this.payments);

  constructor() { }

  savePayments(payments) {
    this.payments = payments;
    this.payments$.next(payments);
  }

}
