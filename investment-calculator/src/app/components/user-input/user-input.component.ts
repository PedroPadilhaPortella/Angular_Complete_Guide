import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  private investmentService = inject(InvestmentService)
  private formBuilder = inject(FormBuilder)

  form: FormGroup = this.formBuilder.group({
    initialInvestment: [null, [Validators.required]],
    annualInvestment: [null, [Validators.required]],
    expectedReturn: [null, [Validators.required]],
    duration: [null, [Validators.required]],
  });

  onSubmit() {
    this.investmentService.calculateInvestmentResults(this.form.value);
    this.form.reset();
  }
}
