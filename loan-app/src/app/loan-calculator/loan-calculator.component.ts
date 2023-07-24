/**
 * title: loan-calculator.component.ts
 * author: ngi bujri
 * date: july 21 2023
 */

import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css'],
})
export class LoanCalculatorComponent implements OnInit {
  monthlyPayment: number;
  totalInterest: number;
  loanForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      // make fields required
      loanAmount: ['', Validators.required],
      intRate: ['', Validators.required],
      numOfYears: ['', Validators.required],
    });
  }

  // calculate monthly loan payments and interest
  calculateLoan(): void {
    // get input values
    const loanAmount = this.loanForm.value.loanAmount;
    const intRate = this.loanForm.value.intRate;
    const numOfYears = this.loanForm.value.numOfYears;

    // monthly rate
    const monthlyIntRate = intRate / 100 / 12;
    // months to pay loan
    const numOfPayments = numOfYears * 12;

    // monthly payments
    this.monthlyPayment =
      (loanAmount *
        monthlyIntRate *
        Math.pow(1 + monthlyIntRate, numOfPayments)) /
      (Math.pow(1 + monthlyIntRate, numOfPayments) - 1);

    this.totalInterest = this.monthlyPayment * numOfPayments - loanAmount;
  }
}
