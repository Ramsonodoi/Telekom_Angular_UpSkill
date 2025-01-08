import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../../../login-state';

const selectLogin = createFeatureSelector<LoginState>('login');

export const selectToken = createSelector(
  selectLogin,
  (loginState: LoginState) => loginState.authResponse.token
);

export const selectLoginError = createSelector(
  selectLogin,
  (loginState: LoginState) => loginState.error
);
