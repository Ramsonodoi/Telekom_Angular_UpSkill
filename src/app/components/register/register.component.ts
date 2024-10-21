import { RegisterRequest } from './../../register-request';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  email : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.email]) 
  password : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.minLength(5)]) 
  
  registerForm!: FormGroup;

  inlineNotification: {show: boolean; type: string; text: string} = {
    show: false,
    type: '',
    text: ''
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.registerForm = this.formBuilder.group({
      
      email: this.email,
      password: this.password
    })  
  }

  register(){
    console.log("Register", this.registerForm.value)
    const registerRequest: RegisterRequest = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }

    this.authService.register(registerRequest ).subscribe({
      next: (res: any) => {
        console.log(res)
        this.router.navigate(['login'])
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}
