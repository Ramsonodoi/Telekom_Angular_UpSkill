import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { LoginRequest } from '../../login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.email]) 
  password : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.minLength(5)]) 
  
  loginForm!: FormGroup;

  inlineNotification: {show: boolean; type: string; text: string} = {
    show: false,
    type: '',
    text: ''
  }
  constructor(private FormBuilder: FormBuilder, private authService: AuthService, private router: Router) {
     this.loginForm = this.FormBuilder.group({
      email: this.email,
      password: this.password
     })
  }

  login() {
     console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm .get('password')?.value
       }
       this.authService.login(loginRequest).subscribe({
        next: (res: any) => {
          console.log(res)
          this.authService.setLoggedIn(true)
          this.router.navigate(['add-tech'])
        },
        error: (err: any) => {
          console.log(err)
          this.loginForm.reset()
          this.inlineNotification = {
            show: true,
            type: 'error',
            text: 'Login failed, please try again'
          }
        }
       })
    } else {
      this.inlineNotification = {
        show: true,
        type: 'error',
        text: 'Invalid Credentials!'
      }
    }
  }
}
