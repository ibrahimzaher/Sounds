import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TextInputComponent } from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-copoun',
  imports: [
    ButtonComponent,
    DecimalPipe,
    TranslatePipe,
    ReactiveFormsModule,
    TextInputComponent,
    RouterLink,
  ],
  templateUrl: './copoun.component.html',
})
export class CopounComponent {
  private readonly _cartService = inject(CartService);
  private readonly _destroyRef = inject(DestroyRef);

  readonly isApplyingCoupon = signal(false);

  // Consume centralized signals — single source of truth
  readonly cart = this._cartService.cart;
  readonly hasItems = this._cartService.hasItems;
  readonly subtotal = this._cartService.subtotal;
  readonly total = this._cartService.total;
  readonly totalDiscountAmount = this._cartService.totalDiscount;
  readonly discountPercent = this._cartService.discountPercent;
  readonly lastAppliedCoupon = this._cartService.lastAppliedCoupon;

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
