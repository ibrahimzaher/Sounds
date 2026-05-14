import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable, switchMap, tap, of } from 'rxjs';
import {
  AppliedCoupon,
  Cart,
  ICartResponse,
  IClearCart,
} from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _httpClient = inject(HttpClient);
  private _toastrService = inject(ToastrService);
  private _translateService = inject(TranslateService);
  private _cart = signal<Cart | null>(null);
  readonly cart = computed(() => this._cart());
  readonly cartCount = computed(() => this.cart()?.cartItems.length ?? 0);
  readonly hasItems = computed(() => this.cartCount() > 0);

  readonly subtotal = computed(() => this.cart()?.totalPrice ?? 0);
  readonly total = computed(
    () => this.cart()?.totalPriceAfterDiscount ?? this.subtotal()
  );
  readonly totalDiscount = computed(() => {
    const diff = this.subtotal() - this.total();
    return diff > 0 ? diff : 0;
  });
  readonly discountPercent = computed(() => {
    if (this.subtotal() === 0) return 0;
    return Math.round((this.totalDiscount() / this.subtotal()) * 100);
  });
  readonly lastAppliedCoupon = computed(() => {
    const coupons = this.cart()?.appliedCoupons;
    return coupons && coupons.length > 0 ? coupons[coupons.length - 1] : null;
  });

  private getLastAppliedCoupon(appliedCoupons: AppliedCoupon[]): string | null {
    if (!appliedCoupons?.length) return null;
    const lastCoupon = appliedCoupons[appliedCoupons.length - 1];
    return lastCoupon?.coupon?.code || null;
  }

  private reapplyCouponIfExists(res: ICartResponse): Observable<ICartResponse> {
    const couponCode = this.getLastAppliedCoupon(res.cart?.appliedCoupons);
    if (couponCode) {
      return this.applyCoupon(couponCode, true);
    }
    return of(res);
  }

  private updateState(res: ICartResponse) {
    this._cart.set(res.cart);
  }

  addToCart(productId: string, quantity = 1): Observable<ICartResponse> {
    return this._httpClient
      .post<ICartResponse>(`${environment.baseUrl}/cart`, {
        product: productId,
        quantity,
      })
      .pipe(
        tap((res) => {
          this.updateState(res);
          this._toastrService.success(
            this._translateService.instant('CART.ADD_SUCCESS')
          );
        }),
        switchMap((res) => this.reapplyCouponIfExists(res))
      );
  }

  updateToCart(productId: string, quantity: number): Observable<ICartResponse> {
    return this._httpClient
      .put<ICartResponse>(`${environment.baseUrl}/cart/${productId}`, {
        quantity,
      })
      .pipe(
        tap((res) => {
          this.updateState(res);
          this._toastrService.success(
            this._translateService.instant('CART.UPDATE_SUCCESS')
          );
        }),
        switchMap((res) => this.reapplyCouponIfExists(res))
      );
  }

  getLoggedUserCart(): Observable<ICartResponse> {
    return this._httpClient
      .get<ICartResponse>(`${environment.baseUrl}/cart`)
      .pipe(
        tap((res) => {
          this.updateState(res);
        })
      );
  }

  removeCartItem(productId: string): Observable<ICartResponse> {
    return this._httpClient
      .delete<ICartResponse>(`${environment.baseUrl}/cart/${productId}`)
      .pipe(
        tap((res) => {
          this.updateState(res);
          this._toastrService.success(
            this._translateService.instant('CART.REMOVE_SUCCESS')
          );
        }),
        switchMap((res) => this.reapplyCouponIfExists(res))
      );
  }

  clearUserCart(): Observable<IClearCart> {
    return this._httpClient
      .delete<IClearCart>(`${environment.baseUrl}/cart`)
      .pipe(
        tap(() => {
          this.setDefaultCart();
          this._toastrService.success(
            this._translateService.instant('CART.CLEAR_SUCCESS')
          );
        })
      );
  }
  setDefaultCart() {
    this._cart.set(null);
  }
  applyCoupon(code: string, silent = false): Observable<ICartResponse> {
    return this._httpClient
      .post<ICartResponse>(`${environment.baseUrl}/coupons/apply`, { code })
      .pipe(
        tap((res) => {
          this.updateState(res);
          if (!silent) {
            this._toastrService.success(
              this._translateService.instant('CART.COUPON_APPLIED')
            );
          }
        })
      );
  }
}
