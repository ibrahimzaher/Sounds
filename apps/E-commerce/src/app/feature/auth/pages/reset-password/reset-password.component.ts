import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRepo } from '@elevate/auth-domain';
import { TextInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ValidationsUtils } from '../../../../shared/utils/validators/validators-utils';
import { ResetPasswordState } from '../../services/reset-password-state.service';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  private readonly auth = inject(AuthRepo);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly resetState = inject(ResetPasswordState);

  readonly email = this.resetState.email;
  readonly isLoading = signal(false);

  readonly form = new FormGroup(
    {
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(ValidationsUtils.passwordPattern),
        ],
        nonNullable: true,
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    },
    {
      validators: ValidationsUtils.matchFieldsValidator(
        'password',
        'confirmPassword'
      ),
    }
  );

  ngOnInit(): void {
    if (!this.email()) {
      this.resetState.setStep(1);
    }
  }

  onSubmit(): void {
    if (this.form.invalid || !this.email()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { password } = this.form.getRawValue();

    this.auth
      .resetPassword({ email: this.email(), newPassword: password })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.toastr.success(
            this.translate.instant('AUTH.RESET_PASSWORD.SUCCESS')
          );
          this.resetState.reset();
          this.router.navigate(['/auth/login']);
        },
      });
  }
}