import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { TextInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { LucideAngularModule } from 'lucide-angular';
import { languageService } from '../../../../core/services/language-service';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextInputComponent,
    ButtonComponent,
    LucideAngularModule,
    RouterLink,
  ],
  templateUrl: './checkout-summary.component.html',
})
export class CheckoutSummaryComponent {
  private readonly _cartService = inject(CartService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly LanguageService = inject(languageService);
  readonly isRtl = computed(() => this.LanguageService.isRTL());
  readonly showCheckoutButton = input<boolean>(false);

  // Consume centralized signals — single source of truth
  readonly cart = this._cartService.cart;
  readonly hasItems = this._cartService.hasItems;
  readonly subtotal = this._cartService.subtotal;
  readonly total = this._cartService.total;
  readonly totalDiscountAmount = this._cartService.totalDiscount;
  readonly discountPercent = this._cartService.discountPercent;
  readonly lastAppliedCoupon = this._cartService.lastAppliedCoupon;

  readonly isApplyingCoupon = signal(false);

  readonly couponForm = new FormGroup({
    code: new FormControl('', {
      nonNullable: true,
    }),
  });

  applyCoupon(): void {
    if (this.isApplyingCoupon() || !this.hasItems()) {
      return;
    }

    const code = this.couponForm.controls.code.value.trim();
    this.couponForm.controls.code.setValue(code);

    if (!code) {
      this.couponForm.controls.code.markAsTouched();
      return;
    }

    this.isApplyingCoupon.set(true);

    this._cartService
      .applyCoupon(code)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isApplyingCoupon.set(false))
      )
      .subscribe({
        next: () => {
          this.couponForm.reset({ code: '' });
        },
      });
  }
}
