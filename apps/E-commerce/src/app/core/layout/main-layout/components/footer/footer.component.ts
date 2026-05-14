import { Component, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '@elevate/reusable-ui';
import { ArrowLeft, ArrowRight } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionService } from './subscription.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SubscriptionReq, SubscriptionRes } from './subscription.model';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  translate: TranslateService = inject(TranslateService);
  private readonly toastr = inject(ToastrService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly destroyRef = inject(DestroyRef);

  readonly arrowLeft = ArrowLeft;
  readonly arrowRight = ArrowRight;

  subscriptionForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  readonly isLoading = signal(false);

  footerLinks = [
    { label: 'FOOTER.HOME', route: '/' },
    { label: 'FOOTER.PRODUCTS', route: '/products' },
    { label: 'FOOTER.CATEGORIES', route: '/categories' },
    { label: 'FOOTER.OCCASIONS', route: '/occasions' },
    { label: 'FOOTER.CONTACT', route: '/contact' },
    { label: 'FOOTER.ABOUT', route: '/about-us' },
    { label: 'FOOTER.TERMS_CONDITIONS', route: '/terms' },
    { label: 'FOOTER.PRIVACY_POLICY', route: '/privacy' },
    { label: 'FOOTER.FAQS', route: '/faqs' },
  ];

  submitSubscription(): void {
    if (this.subscriptionForm.invalid) {
      this.subscriptionForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const payload: SubscriptionReq = {
      email: this.subscriptionForm.getRawValue().email,
    };

    this.subscriptionService
      .subscribeToNewsletter(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res: SubscriptionRes) => {
          this.subscriptionForm.reset({ email: '' });
          this.toastr.success(res.message);
        },
      });
  }
}
