import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepo } from '@elevate/auth-domain';
import { OtpInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {
  finalize,
  interval,
  map,
  startWith,
  Subject,
  takeUntil,
  takeWhile,
} from 'rxjs';
import { ResetPasswordState } from '../../services/reset-password-state.service';
import { LoadingState } from './interface/LoadingState.interface';

@Component({
  selector: 'app-otp-code',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    OtpInputComponent,
    TranslatePipe,
  ],
  templateUrl: './otp-code.component.html',
})
export class OtpCodeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly auth = inject(AuthRepo);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly resetState = inject(ResetPasswordState);
  private readonly timerReset$ = new Subject<void>();

  private readonly TIMER_DURATION = 60;
  private readonly OTP_LENGTH = 6;

  readonly email = this.resetState.email;
  readonly timer = signal(0);
  readonly loadingState = signal<LoadingState>('idle');

  readonly isVerifying = computed(() => this.loadingState() === 'verifying');
  readonly isResending = computed(() => this.loadingState() === 'resending');
  readonly isLoading = computed(() => this.loadingState() !== 'idle');
  readonly canResend = computed(() => this.timer() === 0 && !this.isLoading());
  readonly isFormValid = computed(
    () => this.otpControl.valid && this.email().length > 0
  );

  readonly otpControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(this.OTP_LENGTH),
      Validators.maxLength(this.OTP_LENGTH),
    ],
    nonNullable: true,
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.startTimer();
    }
  }

  private startTimer(): void {
    this.timer.set(this.TIMER_DURATION);

    interval(1000)
      .pipe(
        startWith(0),
        map((tick) => this.TIMER_DURATION - tick - 1),
        takeWhile((time) => time >= 0),
        takeUntil(this.timerReset$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((time) => this.timer.set(time));
  }

  private resetTimer(): void {
    this.timerReset$.next();
    this.startTimer();
  }

  verify(): void {
    if (!this.isFormValid() || this.isLoading()) {
      this.otpControl.markAsTouched();
      return;
    }

    this.loadingState.set('verifying');

    this.auth
      .verifyResetCode({
        resetCode: this.otpControl.value,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loadingState.set('idle'))
      )
      .subscribe({
        next: () => {
          this.resetState.setStep(3);
        },
      });
  }

  resend(): void {
    if (!this.canResend()) {
      return;
    }

    this.loadingState.set('resending');

    this.auth
      .forgetPassword({ email: this.email() })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loadingState.set('idle'))
      )
      .subscribe({
        next: () => {
          this.resetTimer();
          this.otpControl.reset();
          this.toastr.success(
            this.translate.instant('AUTH.OTP.SUCCESS_RESEND')
          );
        },
      });
  }

  onEdit(): void {
    this.resetState.setStep(1);
  }

  formatTimer(): string {
    const time = this.timer();
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}