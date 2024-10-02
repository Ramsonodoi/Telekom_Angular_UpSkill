import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterComponent } from "./register.component";
import {  provideHttpClient} from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [  RegisterComponent],
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
})