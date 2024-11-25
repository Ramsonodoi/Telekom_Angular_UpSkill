import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequest } from '../../login-request';
import { Store } from '@ngrx/store';
import { loginUser } from '../store/actions/login.actions';
import { InlineNotificationService } from '../../services/inline-notification.service';
import { InlineNotification } from '../../inlineNotification';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { CustomInputComponent } from "../custom-input/custom-input.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ValidationMessagesComponent, CustomInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {

  inlineNotification: InlineNotification = { show: false, type: '', text: '' };

  ngOnInit(): void {
   this.notificationSubscription = this.notificationService.notification$.subscribe((notification) => {
      if (notification) {
        this.inlineNotification = notification;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe()
    }
  }

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

  constructor(
    private store: Store,
    private notificationService: InlineNotificationService,
    private notificationSubscription: Subscription
  ) {}

  login(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      };

      this.store.dispatch(loginUser({ loginRequest }));
    } else {
      this.loginForm.markAllAsTouched();
      this.notificationService.showNotification(
        'error',
        'Please fill in all required fields correctly.'
      );
    }
  }
}
