import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { finalize, of, switchMap } from 'rxjs';

import { StepperComponent } from '../../shared/components/ui/stepper/stepper.component';

import { ProductLikedComponent } from '../cart/components/product-liked/product-liked.component';
import { CartService } from '../cart/services/cart.service';
import { ShippingAddress } from '../shipping-address/interfaces/shipping-address.interface';
import { ShippingAddressComponent } from '../shipping-address/shipping-address.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
import { PaymentMethodSectionComponent } from './components/payment-method/payment-method.component';
import { PaymentMethod } from './interfaces/checkout.interface';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    StepperComponent,
    PaymentMethodSectionComponent,
    CheckoutSummaryComponent,
    ProductLikedComponent,
    ShippingAddressComponent,
  ],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private readonly _router = inject(Router);
  private readonly _checkoutService = inject(CheckoutService);
  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _translateService = inject(TranslateService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _platformId = inject(PLATFORM_ID);

  readonly checkoutStepsCount = 2;

  currentStep = signal<number>(1);
  selectedAddress = signal<ShippingAddress | null>(null);
  selectedPaymentMethod = signal<PaymentMethod>('card');
  isLoading = signal<boolean>(false);

  cart = this._cartService.cart;

  onAddressSelected(address: ShippingAddress) {
    this.selectedAddress.set(address);
  }

  onAddressProceed(address: ShippingAddress) {
    this.selectedAddress.set(address);
    this.currentStep.set(2);
  }

  onPaymentMethodSelected(method: PaymentMethod) {
    this.selectedPaymentMethod.set(method);
  }

  onNext() {
    if (this.currentStep() === 1) {
      this.currentStep.set(2);
    } else {
      this.placeOrder();
    }
  }

  onBack() {
    if (this.currentStep() > 1) {
      this.currentStep.set(1);
    } else {
      this._router.navigate(['/shopping-cart']);
    }
  }

  placeOrder() {
    const address = this.selectedAddress();

    if (!address) {
      return;
    }

    this.isLoading.set(true);

    this._checkoutService
      .createOrder(address, this.selectedPaymentMethod())
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        switchMap((res: any) => {
          if ('session' in res && res.session.url) {
            if (isPlatformBrowser(this._platformId)) {
              window.location.href = res.session.url;
            }
            return of(null);
          }

          this._toastrService.success(
            this._translateService.instant('CHECKOUT.ORDER_SUCCESS') ||
              'Order placed successfully!'
          );
          this._cartService.setDefaultCart();
          return this._cartService.getLoggedUserCart();
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this._router.navigate(['/allOrders']);
          }
        },
        error: (err) => {
          this._toastrService.error(
            err.error?.message ||
              this._translateService.instant('CHECKOUT.ORDER_FAILED') ||
              'Payment failed, please try again or choose another method'
          );
        },
      });
  }
}
