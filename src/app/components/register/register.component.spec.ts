import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterComponent } from "./register.component";
import {  provideHttpClient} from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [  RegisterComponent, ReactiveFormsModule],
        providers: [AuthService,  provideHttpClient(), provideHttpClientTesting(),]
      }).compileComponents()
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it ('should have a form', () => {
         let form = fixture.debugElement.query(By.css('form'))
         expect(form).toBeTruthy()

    })

    it ('should have the needed fields', () => {
      expect(component.registerForm.get('email')).toBeTruthy();
      expect(component.registerForm.get('password')).toBeTruthy();

      const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
      const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'))
      const button = fixture.debugElement.query(By.css('button')) 

      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
      expect(button).toBeTruthy()
      expect(button.nativeElement.textContent.trim()).toBe('Register')
    })
})