
import { createReducer, on } from "@ngrx/store";
import { loginFailure, loginSuccess } from "../actions/login.actions";
import { AuthResponse } from "../../../auth-response";



export const initialState: AuthResponse= {
   token: ''
}

export const loginReducer = createReducer(
    initialState,

   on(loginSuccess, (state, {token}) => ({...state, token})),

   on(loginFailure, (state, {error}) => ({...state, error})) 
)