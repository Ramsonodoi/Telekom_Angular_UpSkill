import { RegisterRequest } from './../../register-request';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InlineNotificationService } from '../../services/inline-notification.service';
import { InlineNotification } from '../../inlineNotification';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ValidationMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  inlineNotification: InlineNotification = { show: false, type: '', text: '' };

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification) => {
      if (notification) {
        this.inlineNotification = notification;
      }
    });
  }
  registerForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private notificationService: InlineNotificationService
  ) {}

  register() {
    const registerRequest: RegisterRequest = {
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? '',
    };

    this.authService.register(registerRequest).subscribe({
      next: () => {
        this.router.navigateByUrl('login');
      },
      error: () => {
        this.toaster.error('Only defined users succeed registration');
        this.notificationService.showNotification(
          'error',
          'Use correct email from reqres to register'
        );
      },
      complete: () => {
        this.toaster.success('Registration request completed');
      },
    });
  }
}
