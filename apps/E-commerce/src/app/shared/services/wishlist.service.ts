import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'apps/E-commerce/src/environments/environments';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../components/ui/product-card/interface/product';
import { Observable, throwError } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

export interface WishlistResponse {
  count: number;
  data: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly baseUrl = environment.baseUrl;

  private readonly _wishlistIds = signal<string[]>([]);
  private readonly _wishlistProducts = signal<Product[]>([]);
  private readonly _isLoading = signal<boolean>(false);

  readonly wishlistIds = this._wishlistIds.asReadonly();
  readonly wishlistProducts = this._wishlistProducts.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly wishlistCount = computed(() => this._wishlistIds().length);

  isInWishlist(productId: string): boolean {
    return this._wishlistIds().includes(productId);
  }

  loadWishlist(): Observable<unknown> {
    this._isLoading.set(true);
    return this.http.get<unknown>(`${this.baseUrl}/wishlist`).pipe(
      tap({
        next: (res) => {
          const record = res as any;
          const productsArray: Product[] = record?.wishlist?.products || [];

          const rawIds = productsArray.map((p: any) => p._id || p.id);
          const ids = rawIds.filter((id: any): id is string => !!id);
          this._wishlistIds.set(ids);
          this._wishlistProducts.set(productsArray);
          this._isLoading.set(false);
        },
        error: () => {
          this._isLoading.set(false);
        },
      })
    );
  }

  toggleWishlist(productId: string): Observable<unknown> {
    if (this.isInWishlist(productId)) {
      return this.removeFromWishlist(productId);
    } else {
      return this.addToWishlist(productId);
    }
  }

  addToWishlist(productId: string): Observable<unknown> {
    // Optimistic update
    this._wishlistIds.update((ids) => {
      if (!ids.includes(productId)) {
        return [...ids, productId];
      }
      return ids;
    });

    return this.http
      .post<unknown>(`${this.baseUrl}/wishlist`, { productId })
      .pipe(
        tap({
          next: () => {
            this.toastr.success(
              this.translate.instant('WISHLIST.ADDED')
            );
          },
          error: () => {
            // Rollback
            this._wishlistIds.update((ids) => ids.filter(id => id !== productId));
          },
        }),
        switchMap(() => this.loadWishlist())
      );
  }

  removeFromWishlist(productId: string): Observable<unknown> {
    // Optimistic update
    this._wishlistIds.update((ids) => ids.filter(id => id !== productId));
    this._wishlistProducts.update((products) =>
      products.filter((p) => p._id !== productId)
    );

    return this.http
      .delete<unknown>(`${this.baseUrl}/wishlist/${productId}`)
      .pipe(
        tap({
          next: () => {
            this.toastr.success(
              this.translate.instant('WISHLIST.REMOVED')
            );
          },
          error: () => {
            // Rollback
            this._wishlistIds.update((ids) => {
              if (!ids.includes(productId)) {
                return [...ids, productId];
              }
              return ids;
            });
          },
        }),
        catchError((err) => this.loadWishlist().pipe(
          switchMap(() => throwError(() => err))
        ))
      );
  }

  clearWishlist(): void {
    this._wishlistIds.set([]);
    this._wishlistProducts.set([]);
  }
}
