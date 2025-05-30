import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

type RoleType = 'student' | 'teacher' | 'employee' | 'founder' | 'other';

function fieldsAreEqual(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const controlValue1 = control.get(controlName1)?.value;
    const controlValue2 = control.get(controlName2)?.value;

    if (controlValue1 === controlValue2) return null;
    return { fieldsAreEqual: false } as ValidationErrors;
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})
export class SignupComponent {

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    }, { validators: [fieldsAreEqual('password', 'confirmPassword')] }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    role: new FormControl<RoleType>('student', { validators: [Validators.required] }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  submit() {
    if (this.signupForm.invalid) {

    }

    console.log(this.signupForm);
  }

  reset() {
    this.signupForm.reset();
  }
}
