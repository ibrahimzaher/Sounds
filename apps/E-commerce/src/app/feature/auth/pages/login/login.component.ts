import { CartService } from './../../../cart/services/cart.service';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthModel, AuthRepo } from '@elevate/auth-domain';
import {
  CheckboxInputComponent,
  TextInputComponent,
} from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap } from 'rxjs';
import {
  AuthPage,
  AuthPageData,
} from '../../../../core/layout/auth-layout/interfaces/auth-page-data';
import { authConfig } from '../../auth.config';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TextInputComponent,
    CheckboxInputComponent,
    ButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AuthPage {
  private readonly auth = inject(AuthRepo);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastr = inject(ToastrService);
  private readonly cartService = inject(CartService);
  readonly authData = signal<AuthPageData>(authConfig.login);

  readonly isLoading = signal(false);

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    rememberMe: new FormControl(false, { nonNullable: true }),
  });

  submitLoginForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const { rememberMe, ...payload } = this.loginForm.getRawValue();

    this.auth
      .login(payload, rememberMe)
      .pipe(
        switchMap((res: AuthModel) => {
          this.toastr.success(res.message);
          this.loginForm.reset();

          return this.cartService.getLoggedUserCart();
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
      });
  }
}
