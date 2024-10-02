import { AuthResponse } from './../auth-response';
import { RegisterRequest } from './../register-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from '../login-request';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public  BASE_URL: string = "https://reqres.in/api"
  private loggedIn: WritableSignal<boolean> = signal<boolean>(this.isAuthenticated())

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.BASE_URL}/register`,registerRequest)    
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse>{
     return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, loginRequest).pipe(
      tap((response: AuthResponse) => {
        if (response &&( response.accessToken || response.token)) {
          if (typeof window !== 'undefined' && window.sessionStorage){

            sessionStorage.setItem('token', response.accessToken || response.token)
          }
        } 
      }),
      catchError(this.handleError)
    )
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
    this.loggedIn.set(value)
  }

  getLoggedIn(): WritableSignal<boolean> {
    return this.loggedIn
  }


  // isTokenExpired(token: string): boolean {
  //   const decodedToken: any = jwtDecode(token)
  //   return (decodedToken.exp * 1000) < Date.now()
  // }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
