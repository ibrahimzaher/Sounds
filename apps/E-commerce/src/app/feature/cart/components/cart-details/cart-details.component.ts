import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@elevate/reusable-ui';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { take } from 'rxjs';
import { Cart } from '../../interfaces/cart.interface';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';

@Component({
  selector: 'app-cart-details',
  imports: [
    ButtonComponent,
    LucideAngularModule,
    RouterLink,
    EmptyCartComponent,
    CartItemComponent,
    TranslateModule,
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetailsComponent {
  private readonly cartService = inject(CartService);

  cart = input.required<Cart | null>();
  cartCount = input.required<number>();
  clearCart() {
    this.cartService.clearUserCart().pipe(take(1)).subscribe();
  }
}
