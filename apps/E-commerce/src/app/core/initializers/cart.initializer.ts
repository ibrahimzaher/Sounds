import { inject, provideAppInitializer } from '@angular/core';
import { CartService } from '../../feature/cart/services/cart.service';
import { take } from 'rxjs';
import { StorageService } from '../services/storage-service';

export function provideCartInitializer() {
  return provideAppInitializer(() => {
    const cartService = inject(CartService);
    const storageService = inject(StorageService);
    if (!storageService.get('token')) return;

    queueMicrotask(() => {
      cartService.getLoggedUserCart().pipe(take(1)).subscribe();
    });
  });
}
