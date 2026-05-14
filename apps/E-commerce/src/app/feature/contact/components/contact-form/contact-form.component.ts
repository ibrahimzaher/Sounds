import { languageService } from './../../../../core/services/language-service';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import {
  PhoneInputComponent,
  TextareaInputComponent,
  TextInputComponent,
} from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { ContactRequest } from '../../interfaces/contact.interface';
import { ContactService } from '../../services/contact.service';
import { PhoneValue } from '../../../auth/pages/register/interface/PhoneValue.interface';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  host: {
    class: 'block w-full lg:col-span-3',
  },
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    TextInputComponent,
    TextareaInputComponent,
    ButtonComponent,
    PhoneInputComponent,
  ],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  private readonly contactService = inject(ContactService);
  private readonly toast = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly languageService = inject(languageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly isRtl = computed(() => this.languageService.isRTL());
  readonly isSubmitting = signal(false);

  readonly contactForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
      ],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    subject: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(120),
      ],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ],
    }),
  });

  submitContactForm(): void {
    if (this.contactForm.invalid || this.isSubmitting()) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const { phone: phoneRaw, ...formValues } = this.contactForm.getRawValue();

    const phone =
      typeof phoneRaw === 'string'
        ? phoneRaw
        : (phoneRaw as PhoneValue).e164Number;
    const payload: ContactRequest = {
      ...formValues,
      phone: phone,
    };

    this.isSubmitting.set(true);

    this.contactService
      .sendMessage(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isSubmitting.set(false))
      )
      .subscribe({
        next: () => {
          this.toast.success(
            this.translate.instant('CONTACT_PAGE.SUCCESS_MESSAGE')
          );
          this.contactForm.reset();
        },
      });
  }
}
