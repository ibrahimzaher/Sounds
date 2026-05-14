import { computed, Injectable, signal } from '@angular/core';
import { AuthState } from '../models/auth-state.interface';
import { UserModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService extends AuthState {
  private user = signal<UserModel | null>(null);
  currentUser = this.user.asReadonly();
  isAuthenticated = computed(() => !!this.user());
  setUser(user: UserModel | null) {
    this.user.set(user);
  }
}
