import { Signal } from '@angular/core';
import { UserModel } from './auth.model';

export abstract class AuthState {
  abstract readonly currentUser: Signal<UserModel | null>;
  abstract readonly isAuthenticated: Signal<boolean>;
}
