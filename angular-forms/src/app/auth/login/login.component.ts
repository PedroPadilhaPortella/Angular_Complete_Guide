import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime, Observable, of } from 'rxjs';

function mustContainAtCharacter(control: AbstractControl): ValidationErrors | null {
  if (control.value.includes('@')) return null;
  return { doesNotContainAtCharacter: true } as ValidationErrors;
}

function emailIsAlreadyTaken(control: AbstractControl): Observable<null> | Observable<ValidationErrors> {
  if (control.value !== 'pedro@gmail.com') return of(null);
  return of({ emailAlreadyTaken: true } as ValidationErrors);
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsAlreadyTaken]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainAtCharacter],
    }),
  });

  get isEmailInvalid() {
    return (
      this.loginForm.controls['email'].touched &&
      this.loginForm.controls['email'].dirty &&
      this.loginForm.controls['email'].invalid
    );
  }

  get isPasswordInvalid() {
    return (
      this.loginForm.controls['password'].touched &&
      this.loginForm.controls['password'].dirty &&
      this.loginForm.controls['password'].invalid
    );
  }

  ngOnInit(): void {
    const storedForm = window.localStorage.getItem('loginForm');

    if (storedForm) {
      const storedEmail = JSON.parse(storedForm).email;
      this.loginForm.patchValue({ email: storedEmail });
    }

    const subscription = this.loginForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => window.localStorage.setItem('loginForm', JSON.stringify({ email: value.email }))
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  submit() {
    const { email, password } = this.loginForm.value;
    console.log(email, password);
  }
}
