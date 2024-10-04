import {  provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LoginComponent, ReactiveFormsModule],
      providers:[provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component= fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should validate email format', () => {
    const validEmail = 'michael.lawson@reqres.in'

    component.loginForm.get('email')?.setValue(validEmail)
    

    expect(component.loginForm.get('email')?.value).toBe(validEmail)
    expect(component.loginForm.get('email')?.valid).toBeTruthy()
   
  })

  it('should validate password format', () => {
    const validPassword = '4ahr8r;'

    component.loginForm.get('password')?.setValue(validPassword)

    expect(component.loginForm.get('password')?.value).toBe(validPassword)
    expect(component.loginForm.get('password')?.value).toBeTruthy()
  })

  it ('should call login() method with correct credentials', () => {
    const email = 'kwakunii@gmail.com';
    const password = '4ahr8r;';
    
    component.loginForm.get('email')?.setValue(email)
    component.loginForm.get('password')?.setValue(password)

  

    component.login()
 

    expect(component.loginForm.get('email')?.value).toBe(email)
    expect(component.loginForm.get('password')?.value).toBe(password)
  } )

it ('should display error message with Invalid Credentials!', () => {
     const email = 'kwakuni';
     const password = 'qqqqq'

    component.loginForm.get('email')?.setValue(email)
    component.loginForm.get('password')?.setValue(password)

  

    component.login()
 

    expect(component.loginForm.get('email')?.value).toBe(email)
    expect(component.loginForm.get('password')?.value).toBe(password)

    expect(component.inlineNotification.text).toBe('Invalid Credentials!')
  })

  it ('calls login when button clicked', () => {
   const loginSpy = jest.spyOn(component, 'login')
    
    const email = 'kwakunii@gmail.com';
    const password = '4ahr8r;';
    
    component.loginForm.get('email')?.setValue(email)
    component.loginForm.get('password')?.setValue(password)
    

    const button = fixture.nativeElement.querySelector('button[type="submit"] ')
    button.click()

    fixture.detectChanges()

    expect(component.login).toHaveBeenCalled()
    

  })
})
