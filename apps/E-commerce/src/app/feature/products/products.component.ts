import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductList } from './components/product-list/product.list';
import { FiltersComponent } from './components/filters/filters.component';
import { FilterState } from './interfaces/product';

@Component({
  selector: 'app-products',
  imports: [ProductList, FiltersComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly appliedFilters = signal<FilterState>({});
  readonly initialCategoryIds = signal<string[] | undefined>(undefined);
  readonly initialOccasionIds = signal<string[] | undefined>(undefined);

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const categoryParamIds = params.getAll('category');
        const categoryIds = categoryParamIds.length
          ? categoryParamIds
          : undefined;
        const occasionParamIds = params.getAll('occasion');
        const occasionIds = occasionParamIds.length
          ? occasionParamIds
          : undefined;

        this.initialCategoryIds.set(categoryIds);
        this.initialOccasionIds.set(occasionIds);
        this.appliedFilters.update((current) => ({
          ...current,
          categoryIds,
          occasionIds,
        }));
      });
  }

  onFilterChange(filter: FilterState): void {
    this.initialCategoryIds.set(filter.categoryIds);
    this.initialOccasionIds.set(filter.occasionIds);
    this.appliedFilters.set(filter);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: filter.categoryIds ?? null,
        occasion: filter.occasionIds ?? null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}