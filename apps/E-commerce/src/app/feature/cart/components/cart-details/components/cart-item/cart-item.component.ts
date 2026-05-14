import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ButtonComponent } from '@elevate/reusable-ui';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { take } from 'rxjs';
import { CartItem } from '../../../../interfaces/cart.interface';
import { CartService } from './../../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [
    LucideAngularModule,
    ButtonComponent,
    NgOptimizedImage,
    TranslateModule,
  ],
  host: {
    class:
      'block border-b border-zinc-200 dark:border-zinc-800 last:border-0 pb-5 last:pb-0 transition-colors',
  },
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  private readonly cartService = inject(CartService);
  isFirst = input<boolean>(false);
  cartItem = input.required<CartItem>();

  updateProductQuantity(productId: string, quantity: number) {
    this.cartService
      .updateToCart(productId, quantity)
      .pipe(take(1))
      .subscribe();
  }

  removeProduct(productId: string) {
    this.cartService.removeCartItem(productId).pipe(take(1)).subscribe();
  }
}
