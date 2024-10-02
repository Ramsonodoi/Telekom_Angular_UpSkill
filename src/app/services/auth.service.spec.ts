import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';


describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: any

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthService, provideHttpClient(),  provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    httpClientSpy = {
      post: jest.fn()
    }
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 
});
