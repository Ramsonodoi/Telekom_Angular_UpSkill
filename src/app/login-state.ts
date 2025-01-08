import { AuthResponse } from './auth-response';

export interface LoginState {
  authResponse: AuthResponse;
  error: string;
}
