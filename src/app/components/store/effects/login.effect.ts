import { ToastrService } from 'ngx-toastr';

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loginFailure,
  loginUser,
  loginSuccess,
  loadStoredToken,
} from '../actions/login.actions';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';


@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toaster = inject (ToastrService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap(({ loginRequest }) =>
        this.authService.login(loginRequest).pipe(
          tap(({ token }) => {
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem('token', token);
            }
          }),
          map((response) => loginSuccess(response)),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/add-tech']))
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(loginFailure),
        filter(({error }) => !!error.error?.error),
        tap(({error})=> {
         const errorMessage =    error.error?.error;
          this.toaster.error(errorMessage)
        })
      ),
      {dispatch: false }
  )

  loadStoredToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStoredToken),
      map(() => {
        if (typeof sessionStorage !== 'undefined') {
          const token = sessionStorage.getItem('token');
          if (token) {
            return loginSuccess({ token });
          }
        }
        const error: HttpErrorResponse = {
          error: 'No token found',
          status: 401,
          message: 'Unauthorized',
          name: 'HttpErrorResponse',
          ok: false,
          headers: new HttpHeaders(),
          statusText: 'Unauthorized',
          url: null,
          type: HttpEventType.ResponseHeader,
        };
        return loginFailure({ error });
      })
    )
  );
}
