import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequest } from '../../login-request';
import { Store } from '@ngrx/store';
import { loginUser } from '../store/actions/login.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(5)],
      nonNullable: true,
    }),
  });

  inlineNotification: { show: boolean; type: string; text: string } = {
    show: false,
    type: '',
    text: '',
  };

  constructor(private store: Store) {}

  login(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      };

      this.store.dispatch(loginUser({ loginRequest }));
    } else {
      this.loginForm.markAllAsTouched();
      this.showError('Please fill in all required fields correctly.');
    }
  }

  private showError(message: string): void {
    this.inlineNotification = {
      show: true,
      type: 'error',
      text: message,
    };
  }
}
