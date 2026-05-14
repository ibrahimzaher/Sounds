import { DecimalPipe } from '@angular/common';
import { HttpContext } from '@angular/common/http';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ProductsService } from '../../../../../../../app/feature/products/services/product';
import { Product } from '../../../../../../shared/components/ui/product-card/interface/product';
import { SKIP_GLOBAL_LOADING } from '../../../../../interceptors/loading-interceptor';
import { ClickOutsideDirective } from '../../../../../utils/click-outside.directive';

@Component({
  selector: 'app-navbar-search',
  imports: [
    ClickOutsideDirective,
    DecimalPipe,
    LucideAngularModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './navbar-search.component.html',
  host: {
    class: 'block flex-1 min-w-0',
  },
})
export class NavbarSearchComponent {
  private readonly MIN_SEARCH_LENGTH = 2;
  private readonly destroy = inject(DestroyRef);
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  readonly searchInputId = 'navbar-search-input';
  readonly searchPanelId = 'navbar-search-panel';
  readonly searchResultsId = 'navbar-search-results';

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly searchValue = signal('');
  readonly searchResults = signal<Product[]>([]);
  readonly suggestedProducts = signal<Product[]>([]);
  readonly isSearchPanelOpen = signal(false);
  readonly isSearchLoading = signal(false);
  readonly isSuggestedProductsLoading = signal(false);
  readonly hasSearchTerm = computed(
    () => this.searchValue().length >= this.MIN_SEARCH_LENGTH
  );
  readonly panelProducts = computed(() =>
    this.hasSearchTerm() ? this.searchResults() : this.suggestedProducts()
  );
  readonly isPanelLoading = computed(() =>
    this.hasSearchTerm()
      ? this.isSearchLoading()
      : this.isSuggestedProductsLoading()
  );
  readonly showNoSearchResults = computed(
    () =>
      this.hasSearchTerm() &&
      !this.isSearchLoading() &&
      this.searchResults().length === 0
  );
  readonly showNoSuggestedProducts = computed(
    () =>
      !this.hasSearchTerm() &&
      !this.isSuggestedProductsLoading() &&
      this.suggestedProducts().length === 0
  );

  constructor() {
    this.listenToSearchControlChanges();
    this.listenToRouteChanges();
  }

  private listenToSearchControlChanges(): void {
    this.searchControl.valueChanges
      .pipe(
        map((value) => value.trim()),
        tap((value) => {
          this.searchValue.set(value);

          if (value.length < this.MIN_SEARCH_LENGTH) {
            this.searchResults.set([]);
            this.isSearchLoading.set(false);
          }
        }),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((keyword) => {
          if (keyword.length < this.MIN_SEARCH_LENGTH) {
            return of<Product[]>([]);
          }

          this.isSearchLoading.set(true);

          return this.productsService
            .getProducts(
              { keyword, limit: 20 },
              { context: this.createSkipGlobalLoadingContext() }
            )
            .pipe(
              map((response) => response.products),
              catchError(() => of<Product[]>([])),
              finalize(() => this.isSearchLoading.set(false))
            );
        }),
        takeUntilDestroyed(this.destroy)
      )
      .subscribe((products) => {
        this.searchResults.set(products);
      });
  }

  private listenToRouteChanges(): void {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.closeSearchPanel();
        }
      });
  }

  openSearchPanel(): void {
    this.isSearchPanelOpen.set(true);
    this.loadSuggestedProducts();
  }

  closeSearchPanel(): void {
    this.isSearchPanelOpen.set(false);
  }

  clearAndCloseSearch(): void {
    this.resetSearch(false);
    this.closeSearchPanel();
  }

  selectProduct(product: Product): void {
    this.clearAndCloseSearch();
    this.router.navigate(['/products', product._id]);
  }

  getProductPrice(product: Product): number {
    return product.priceAfterDiscount ?? product.price;
  }

  highlightTitle(title: string): string {
    const keyword = this.searchValue();

    if (!keyword) {
      return this.escapeHtml(title);
    }

    const matchIndex = title.toLowerCase().indexOf(keyword.toLowerCase());

    if (matchIndex === -1) {
      return this.escapeHtml(title);
    }

    const beforeMatch = title.slice(0, matchIndex);
    const match = title.slice(matchIndex, matchIndex + keyword.length);
    const afterMatch = title.slice(matchIndex + keyword.length);

    return `${this.escapeHtml(
      beforeMatch
    )}<mark class="navbar-search-highlight">${this.escapeHtml(
      match
    )}</mark>${this.escapeHtml(afterMatch)}`;
  }

  private resetSearch(emitEvent = true): void {
    this.searchControl.setValue('', { emitEvent });
    this.searchValue.set('');
    this.searchResults.set([]);
    this.isSearchLoading.set(false);
  }

  private loadSuggestedProducts(): void {
    if (this.suggestedProducts().length || this.isSuggestedProductsLoading()) {
      return;
    }

    this.isSuggestedProductsLoading.set(true);

    this.productsService
      .getProducts(
        { limit: 20 },
        { context: this.createSkipGlobalLoadingContext() }
      )
      .pipe(
        take(1),
        map((response) => response.products),
        catchError(() => of<Product[]>([])),
        finalize(() => this.isSuggestedProductsLoading.set(false)),
        takeUntilDestroyed(this.destroy)
      )
      .subscribe((products) => {
        this.suggestedProducts.set(products);
      });
  }

  private createSkipGlobalLoadingContext(): HttpContext {
    return new HttpContext().set(SKIP_GLOBAL_LOADING, true);
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (char) => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };

      return entities[char];
    });
  }
}
