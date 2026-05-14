import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepo, AuthState } from '@elevate/auth-domain';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { TextInputComponent, PhoneInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { PhoneValue } from '../../../auth/pages/register/interface/PhoneValue.interface';

@Component({
  selector: 'app-my-account',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslateModule, ConfirmDialogModule, TextInputComponent, PhoneInputComponent, ButtonComponent],
  providers: [ConfirmationService],
  templateUrl: './my-account.component.html',
})
export class MyAccountComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authRepo = inject(AuthRepo);
  private readonly authState = inject(AuthState);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  profileForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl = signal<string | ArrayBuffer | null>(null);
  isLoading = signal(false);
  isUploadingPhoto = signal(false);

  get user() {
    return this.authState.currentUser();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const user = this.user;
    this.previewUrl.set(user?.photo || null);

    this.profileForm = this.fb.group({
      firstName: [user?.firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [user?.lastName || '', [Validators.required, Validators.minLength(2)]],
      email: [user?.email || '', [Validators.required, Validators.email]],
      phone: [user?.phone || '', [Validators.required]],
      gender: [{ value: user?.gender || '', disabled: true }],
    });
    
    // Use setTimeout to ensure the form is marked as pristine after child components initialize
    setTimeout(() => {
      this.profileForm.markAsPristine();
      this.cdr.markForCheck();
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.toastr.error('File size exceeds 5MB limit');
        return;
      }
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl.set(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload photo immediately
      const oldPhoto = this.previewUrl();
      this.isUploadingPhoto.set(true);
      const formData = new FormData();
      formData.append('photo', file);
      this.authRepo
        .uploadPhoto(formData)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.isUploadingPhoto.set(false);
            this.toastr.success(
              this.translate.instant('PROFILE_PAGE.PHOTO_UPDATED') ||
                'Photo updated successfully'
            );
            this.selectedFile = null;
          },
          error: () => {
            this.isUploadingPhoto.set(false);
            this.previewUrl.set(oldPhoto);
          },
        });
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    if (this.profileForm.pristine) {
      return;
    }

    this.isLoading.set(true);

    const phoneRaw = this.profileForm.value.phone;
    const phone =
      typeof phoneRaw === 'string'
        ? phoneRaw
        : (phoneRaw as PhoneValue).e164Number;

    const payload = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      phone,
    };

    this.authRepo
      .editProfile(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toastr.success(
            this.translate.instant('PROFILE_PAGE.UPDATE_SUCCESS')
          );
          this.profileForm.markAsPristine();
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  deleteAccount(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete your account? This action is permanent and cannot be undone.',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes, delete',
      rejectLabel: 'Nope, not doing it',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.authRepo.deleteMe()
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.toastr.success('Account deleted successfully');
              this.authRepo.cleanData();
              this.router.navigate(['/auth/login']);
            }
          });
      }
    });
  }
}
