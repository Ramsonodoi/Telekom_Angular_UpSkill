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
      return this.http.post<AuthResponse>(`${this.BASE_URL}/register`,registerRequest).pipe(
        catchError(this.handleError)
      )   
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, loginRequest).pipe(
     tap ((response: AuthResponse) => {
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


  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
    
      errorMessage = `Error: ${error.error.message}`;
    } else {
    
      switch (error.status) {
        case 400:

        errorMessage = `Bad Request: ${error.error?.message || error.message}`   
          break;

          case 401: 
        errorMessage  = 'unathorized: You need to log in to access this resource';  
          break;

          case 500: 
        errorMessage = 'Internal Server Error: Please try again later';
          break;
          
          case 503:
        errorMessage = 'Sevice Unavailable: The server is temporarily unable to handle the request';
           break;    

        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.error?.message || error.message || 'Unknown error'}
          }`
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
