import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loginFailure, loginPage, loginSuccess } from '../actions/login.actions';
import { AuthService } from '../../../services/auth.service';

@Injectable()
export class LoginEffects {
    private actions$ = inject(Actions)
    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loginPage),
            switchMap(action => 
                this.authService.handleLoginResponse( this.authService.login(action.loginRequest)).pipe(
                    map((response) => loginSuccess(response )),
                    catchError((error) => of(loginFailure({ error })))
                )
            )
        )
    );

    constructor( private authService: AuthService) {}
}
