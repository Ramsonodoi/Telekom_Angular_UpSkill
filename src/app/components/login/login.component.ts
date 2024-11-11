import { AuthResponse } from './../../auth-response';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LoginRequest } from '../../login-request';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/selectors/login.selectors';
import { loginPage } from '../store/actions/login.actions';
import { filter, first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email: FormControl<string | null> = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl<string | null> = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  loginForm!: FormGroup;

  inlineNotification: { show: boolean; type: string; text: string } = {
    show: false,
    type: '',
    text: '',
  };
  constructor(
    private FormBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.loginForm = this.FormBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    this.store
      .select(selectToken)
      .pipe(
        filter((token) => !!token),
        first()
      )
      .subscribe((token) => {
        if (token) {
          this.router.navigateByUrl('add-tech');
        }
      });
  }

  login() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.store.dispatch(loginPage({ loginRequest }));
    } else {
      this.inlineNotification = {
        show: true,
        type: 'error',
        text: 'Invalid Credentials!',
      };
    }
  }
}
