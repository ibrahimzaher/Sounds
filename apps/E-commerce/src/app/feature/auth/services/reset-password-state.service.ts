import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordState {
  private readonly _email = signal<string>('');
  private readonly _step = signal<1 | 2 | 3>(1);

  readonly email = this._email.asReadonly();
  readonly step = this._step.asReadonly();

  setEmail(email: string): void {
    this._email.set(email);
  }

  setStep(step: 1 | 2 | 3): void {
    this._step.set(step);
  }

  reset(): void {
    this._email.set('');
    this._step.set(1);
  }
}