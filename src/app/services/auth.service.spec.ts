import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { RegisterRequest } from '../register-request';



describe('AuthService', () => {
  let service: AuthService;
  let  httpTestController: HttpTestingController

  beforeEach(() => {  
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthService, provideHttpClient(),  provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpTestController = TestBed.inject(HttpTestingController)
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('should make a POST  request to register endpoint when valid email and password are provided',() => {
     const command: RegisterRequest = {
        email: 'michael.lawson@reqres.in',
        password: ' 4ahr8r;'
     }

     service.register(command).subscribe()
     const request = httpTestController.expectOne(`https://reqres.in/api/register`)

     expect(request.request.method).toEqual('POST')
   })
});
