import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepo } from '@elevate/auth-domain';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TextInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { ValidationsUtils } from '../../../../shared/utils/validators/validators-utils';

@Component({
  selector: 'app-change-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslateModule, TextInputComponent, ButtonComponent],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authRepo = inject(AuthRepo);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);

  isLoading = signal(false);

  passwordForm: FormGroup = this.fb.group(
    {
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
    },
    {
      validators: ValidationsUtils.matchFieldsValidator(
        'newPassword',
        'rePassword'
      ),
    }
  );

  ngOnInit(): void {
    setTimeout(() => {
      this.passwordForm.markAsPristine();
    });
  }


  onSubmit(formDirective: FormGroupDirective): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const payload = {
      password: this.passwordForm.value.password,
      newPassword: this.passwordForm.value.newPassword,
    };

    this.authRepo.changePassword(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toastr.success(
            this.translate.instant('PROFILE_PAGE.PASSWORD_UPDATE_SUCCESS')
          );
          // FormGroupDirective reset is handled via the reference in html if needed, or just reset form
          formDirective.resetForm();
          this.passwordForm.reset();
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }
}
