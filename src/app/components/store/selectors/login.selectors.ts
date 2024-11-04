
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthResponse } from "../../../auth-response";


 const selectLogin = createFeatureSelector<AuthResponse>('login')

export const selectToken = createSelector(selectLogin,(AuthResponse) => AuthResponse.token)
