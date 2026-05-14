import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthRepo } from '@elevate/auth-domain';
import { TextInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { finalize } from 'rxjs';
import {
  AuthPage,
  AuthPageData,
} from '../../../../core/layout/auth-layout/interfaces/auth-page-data';
import { authConfig } from '../../auth.config';
import { ResetPasswordState } from '../../services/reset-password-state.service';
import { OtpCodeComponent } from '../otp-code/otp-code.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    TextInputComponent,
    OtpCodeComponent,
    ResetPasswordComponent,
  ],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements AuthPage {
  private readonly auth = inject(AuthRepo);
  private readonly destroyRef = inject(DestroyRef);
  private readonly resetState = inject(ResetPasswordState);

  readonly step = this.resetState.step;
  readonly isLoading = signal(false);

  readonly authData = computed<AuthPageData>(() => {
    const currentStep = this.step();
    return authConfig.forgotPassword[currentStep];
  });

  readonly forgotPasswordForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  submit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { email } = this.forgotPasswordForm.getRawValue();

    this.auth
      .forgetPassword({ email })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.resetState.setEmail(email);
          this.resetState.setStep(2);
        },
      });
  }
}