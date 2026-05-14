import { DecimalPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Product } from './interface/product';
import { CartService } from '../../../../../app/feature/cart/services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [LucideAngularModule, DecimalPipe, ButtonComponent, TranslatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  private readonly _cartService = inject(CartService);
  private readonly _destroyRef = inject(DestroyRef);
  readonly ICON_SIZE = 18;
  readonly ICON_STROKE = 2;
  readonly EYE_ICON_SIZE = 22;
  readonly CART_ICON_SIZE = 20;

  readonly ADD_WISH = 'ADD_WISH';
  readonly REMOVE_WISH = 'REMOVE_WISH';

  readonly BADGE_BASE =
    'inline-block w-fit max-w-full rounded-full px-2 py-0.5 text-[8px] font-bold uppercase shadow-md sm:px-3 sm:py-1 sm:text-[10px]';

  private readonly router = inject(Router);
  private readonly wishlistService = inject(WishlistService);

  isInWishlist = computed(() =>
    this.wishlistService.isInWishlist(this.product()._id)
  );

  hotProduct = computed(
    () => !!(this.product().sold && this.product().sold >= 500)
  );

  //90 days for add new Badge
  newProduct = computed(() => {
    if (!this.product().createdAt) return false;
    const ninetyDaysInMs = 90 * 24 * 60 * 60 * 1000;
    return (
      new Date(this.product().createdAt) > new Date(Date.now() - ninetyDaysInMs)
    );
  });

  getStarClip(starIndex: number): string {
    const rating = this.product().rateAvg ?? 0;
    if (starIndex <= Math.floor(rating)) return 'inset(0 0 0 0)';
    if (starIndex === Math.ceil(rating)) {
      const partial = (rating % 1) * 100;
      return `inset(0 ${100 - partial}% 0 0)`;
    }
    return 'inset(0 100% 0 0)';
  }

  addToCart(): void {
    this._cartService
      .addToCart(this.product()._id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  addToWishList(): void {
    this.wishlistService.toggleWishlist(this.product()._id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  showProductDetails(): void {
    this.router.navigate(['/products', this.product()._id]);
  }
}
