import { Component, DestroyRef, computed, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { ProductQueryParams } from '../../interfaces/product';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';
import { PaginatorComponent } from '../../../../shared/components/ui/paginator/paginator.component';
import { ProductCardComponent } from '../../../../shared/components/ui/product-card/product-card.component';
import { ProductsService } from '../../services/product';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, SearchX } from 'lucide-angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.list.html',
  imports: [ProductCardComponent, PaginatorComponent, TranslatePipe, LucideAngularModule],
})
export class ProductList {
  readonly SearchXIcon = SearchX;
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  categoryIds = input<string[] | undefined>(undefined);
  occasionIds = input<string[] | undefined>(undefined);
  rating = input<number | undefined>(undefined);
  priceFrom = input<number | undefined>(undefined);
  priceTo = input<number | undefined>(undefined);

  emptyMessageKey = computed(() => {
    let activeFilters = 0;
    if (this.categoryIds()?.length) activeFilters++;
    if (this.occasionIds()?.length) activeFilters++;
    if (this.rating() !== undefined) activeFilters++;
    if (this.priceFrom() !== undefined || this.priceTo() !== undefined)
      activeFilters++;

    if (activeFilters === 0) return 'There are no products available';
    if (activeFilters === 1) {
      if (this.categoryIds()?.length) return 'There are no products in this Category';
      if (this.occasionIds()?.length) return 'There are no products for this Occasion';
      if (this.rating() !== undefined)
        return 'There are no products with this Rating';
      if (this.priceFrom() !== undefined || this.priceTo() !== undefined)
        return 'There are no products in this Price range';
    }
    return 'No products match the selected filters';
  });

  first = signal(0);
  rows = signal(12);
  totalProducts = signal(0);
  allProducts = signal<Product[]>([]);
  isLoading = signal(true);
  showPaginator = computed(
    () => !this.isLoading() && this.totalProducts() > this.rows()
  );

  constructor() {
    effect(() => {
      const categoryIds = this.categoryIds();
      const occasionIds = this.occasionIds();
      const rating = this.rating();
      const priceFrom = this.priceFrom();
      const priceTo = this.priceTo();
      this.first.set(0);
      this.getproducts({
        page: 1,
        limit: this.rows(),
        categoryIds,
        occasionIds,
        rating,
        priceFrom,
        priceTo,
      });
    });
  }

  getproducts(params: ProductQueryParams = {}): void {
    const page = params.page ?? 1;
    const limit = params.limit ?? this.rows();
    const categoryIds = params.categoryIds;
    const occasionIds = params.occasionIds;
    const rating = params.rating;
    const priceFrom = params.priceFrom;
    const priceTo = params.priceTo;

    this.isLoading.set(true);

    this.productsService
      .getProducts({
        page,
        limit,
        categoryIds,
        occasionIds,
        rating,
        priceFrom,
        priceTo,
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.allProducts.set(data.products);

          let actualTotal = data.metadata.totalItems;
          if (data.products.length < data.metadata.limit) {
            actualTotal =
              (page - 1) * data.metadata.limit + data.products.length;
          }

          this.totalProducts.set(actualTotal);
          this.rows.set(data.metadata.limit);
        },
      });
  }

  onPageChange(event: PaginatorState): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows();

    this.first.set(first);
    this.rows.set(rows);

    const page = event.page !== undefined ? event.page + 1 : first / rows + 1;

    this.getproducts({
      page,
      limit: rows,
      categoryIds: this.categoryIds(),
      occasionIds: this.occasionIds(),
      rating: this.rating(),
      priceFrom: this.priceFrom(),
      priceTo: this.priceTo(),
    });
  }
}