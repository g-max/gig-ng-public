import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  payment = '';

  amount = null;

  payments: { payment: string, amount: number, code?: string, matrix?: any }[] = [];

  constructor() { }

  ngOnInit() {
  }

  addPayment() {
    this.payments.push({ payment: this.payment, amount: this.amount });
  }
}
