import { Component, DestroyRef, OnInit, effect, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from '../../../interfaces/product';
import { ProductsService } from '../../../services/product';
import { FilterResetBtnComponent } from '../filter-reset-btn/filter-reset-btn.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-category-filter',
  imports: [FilterResetBtnComponent, TranslatePipe, LucideAngularModule],
  templateUrl: './category-filter.component.html',
})
export class CategoryFilterComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  categories = signal<Category[]>([]);
  initialCategoryIds = input<string[] | undefined>(undefined);
  selectedCategoryIds = signal<Set<string>>(new Set());
  isLoading = signal(true);

  categoryChange = output<string[]>();

  constructor() {
    effect(() => {
      this.selectedCategoryIds.set(new Set(this.initialCategoryIds() ?? []));
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  private fetchCategories(): void {
    this.isLoading.set(true);
    this.productsService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          const sorted = [...data.categories].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          this.categories.set(sorted);
          this.isLoading.set(false);
        }
      });
  }

  selectCategory(id: string): void {
    const current = new Set(this.selectedCategoryIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedCategoryIds.set(current);
    this.categoryChange.emit([...current]);
  }

  onReset(emitChange = true): void {
    this.selectedCategoryIds.set(new Set());

    if (emitChange) {
      this.categoryChange.emit([]);
    }
  }
}