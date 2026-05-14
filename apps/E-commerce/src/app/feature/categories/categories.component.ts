import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutGrid, LucideAngularModule } from 'lucide-angular';
import { finalize } from 'rxjs';
import { TaxonomyCardComponent } from '../../shared/components/ui/taxonomy-card/taxonomy-card.component';
import { Category } from '../products/interfaces/product';
import { ProductsService } from '../products/services/product';

@Component({
  selector: 'app-categories',
  imports: [TranslateModule, LucideAngularModule, TaxonomyCardComponent],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = signal<Category[]>([]);
  readonly isLoading = signal(true);
  readonly skeletonCards = [1, 2, 3, 4, 5, 6, 7, 8];
  readonly LayoutGridIcon = LayoutGrid;

  constructor() {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.isLoading.set(true);

    this.productsService
      .getCategories()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => {
          const sortedCategories = [...res.categories].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          this.categories.set(sortedCategories);
        },
      });
  }
}