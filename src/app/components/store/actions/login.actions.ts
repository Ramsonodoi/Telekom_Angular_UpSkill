import { createAction, props } from "@ngrx/store";
import { LoginRequest } from "../../../login-request";
import { AuthResponse } from "../../../auth-response";
import { HttpErrorResponse } from "@angular/common/http";


export const loginPage = createAction(
    '[Login Component] Login User',
    props<{loginRequest: LoginRequest}>()
)

export const loginSuccess = createAction(
    '[Auth Service] Login User Success',
    props<AuthResponse>()
)

export const loginFailure = createAction(
    '[Auth Service] Login User Failure',
    props<{error: HttpErrorResponse}>()
)