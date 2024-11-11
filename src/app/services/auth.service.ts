import { AuthResponse } from './../auth-response';
import { RegisterRequest } from './../register-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from '../login-request';
import { environment } from '../../environments/environment.development';
import { HttpErrorMessage } from '../components/HttpErrorMessage.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public BASE_URL = `${environment.apiBaseUrl}`;
  private loggedIn: WritableSignal<boolean> = signal<boolean>(
    this.isAuthenticated()
  );

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.BASE_URL}/register`, registerRequest)
      .pipe(catchError(this.handleError));
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, loginRequest);
  }

  handleLoginResponse(
    response$: Observable<AuthResponse>
  ): Observable<AuthResponse> {
    return response$.pipe(
      tap((response: AuthResponse) => {
        if (response && (response.accessToken || response.token)) {
          if (typeof window !== 'undefined' && window.sessionStorage) {
            sessionStorage.setItem(
              'token',
              response.accessToken || response.token
            );
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return !!sessionStorage.getItem('token');
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('token');
    }
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.set(value);
  }

  getLoggedIn(): WritableSignal<boolean> {
    return this.loggedIn;
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
