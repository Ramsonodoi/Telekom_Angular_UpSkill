import { AuthResponse } from './../auth-response';
import { RegisterRequest } from './../register-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,  throwError } from 'rxjs';
import { LoginRequest } from '../login-request';
import { environment } from '../../environments/environment.development';
import { HttpErrorMessage } from '../components/HttpErrorMessage.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public BASE_URL = `${environment.apiBaseUrl}`;


  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.BASE_URL}/register`, registerRequest)
      .pipe(catchError(this.handleError));
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, loginRequest);
  }

 


  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('token');
    }
  }



  public handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = `${HttpErrorMessage.BadRequest} ${
            error.error?.message || error.message
          }`;
          break;

        case 401:
          errorMessage = HttpErrorMessage.Unauthorized;
          break;

        case 500:
          errorMessage = HttpErrorMessage.InternalServerError;
          break;

        case 503:
          errorMessage = HttpErrorMessage.ServiceUnavailable;
          break;

        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${
            error.error?.message ||
            error.message ||
            HttpErrorMessage.UnknownError
          }`;
      }
    }

    // log the error for debugging
    console.error('Error Details: ', {
      status: error.status,
      message: errorMessage,
    });
    return throwError(() => new Error(errorMessage));
  }
}
