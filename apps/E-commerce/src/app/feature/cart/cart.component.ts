import { Component, computed, inject } from '@angular/core';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutSummaryComponent } from '../checkout/components/checkout-summary/checkout-summary.component';
import { ProductLikedComponent } from './components/product-liked/product-liked.component';
import { CartService } from './services/cart.service';
@Component({
  selector: 'app-cart',
  imports: [
    CartDetailsComponent,
    ProductLikedComponent,
    CheckoutSummaryComponent,
  ],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  cart = computed(() => this.cartService.cart());
  cartCount = computed(() => this.cartService.cartCount());
}
