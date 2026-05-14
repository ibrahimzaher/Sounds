import { DOCUMENT, NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, PLATFORM_ID, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { auditTime, fromEvent, startWith } from 'rxjs';
import { DrawerModule } from 'primeng/drawer';
import { ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal } from 'lucide-angular';
import { ButtonComponent } from '@elevate/reusable-ui';
import { FilterState } from '../../interfaces/product';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { OccasionFilterComponent } from './occasion-filter/occasion-filter.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { RatingFilterComponent } from './rating-filter/rating-filter.component';

type FilterLayoutMode = 'mobile' | 'tablet' | 'desktop';

@Component({
  selector: 'app-filters',
  imports: [CategoryFilterComponent, OccasionFilterComponent, RatingFilterComponent, PriceFilterComponent, ButtonComponent, DrawerModule, NgTemplateOutlet, TranslatePipe],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  readonly ResetAllIcon = RotateCcw;
  readonly FiltersTriggerIcon = SlidersHorizontal;
  readonly initialCategoryIds = input<string[] | undefined>(undefined);
  readonly initialOccasionIds = input<string[] | undefined>(undefined);
  readonly filterChange = output<FilterState>();
  readonly viewportMode = signal<FilterLayoutMode>('desktop');
  readonly isTabletPanelExpanded = signal(false);
  readonly isMobileDrawerOpen = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly categoryFilter = viewChild(CategoryFilterComponent);
  private readonly occasionFilter = viewChild(OccasionFilterComponent);
  private readonly ratingFilter = viewChild(RatingFilterComponent);
  private readonly priceFilter = viewChild(PriceFilterComponent);
  private readonly currentState = signal<FilterState>({});

  readonly hasActiveFilters = computed(() => {
    const state = this.currentState();
    return (
      (state.categoryIds?.length ?? 0) > 0 ||
      (state.occasionIds?.length ?? 0) > 0 ||
      state.rating !== undefined ||
      state.priceFrom !== undefined ||
      state.priceTo !== undefined
    );
  });

  readonly showSidebarBorder = computed(
    () => this.viewportMode() === 'desktop'
  );
  readonly tabletToggleIcon = computed(() =>
    this.isTabletPanelExpanded() ? ChevronUp : ChevronDown
  );

  constructor() {
    effect(() => {
      const categoryIds = this.initialCategoryIds();
      const occasionIds = this.initialOccasionIds();
      this.currentState.update((current) => ({
        ...current,
        categoryIds,
        occasionIds,
      }));
    });

    this.bindViewportMode();
  }

  get drawerPosition(): 'left' | 'right' {
    return this.document.documentElement.dir === 'rtl' ? 'right' : 'left';
  }

  openMobileDrawer(): void {
    this.isMobileDrawerOpen.set(true);
  }

  toggleTabletPanel(): void {
    this.isTabletPanelExpanded.update((value) => !value);
  }

  private updateFilterState(partialState: Partial<FilterState>): void {
    const nextState = { ...this.currentState(), ...partialState };
    this.currentState.set(nextState);
    this.filterChange.emit(nextState);
  }

  onCategoryChange(categoryIds: string[]): void {
    this.updateFilterState({ categoryIds: categoryIds.length ? categoryIds : undefined });
  }

  onOccasionChange(occasionIds: string[]): void {
    this.updateFilterState({ occasionIds: occasionIds.length ? occasionIds : undefined });
  }

  onRatingChange(rating: number | null): void {
    this.updateFilterState({ rating: rating ?? undefined });
  }

  onPriceChange(priceRange: { from?: number; to?: number } | null): void {
    this.updateFilterState({
      priceFrom: priceRange?.from,
      priceTo: priceRange?.to,
    });
  }

  resetAllFilters(): void {
    if (!this.hasActiveFilters()) {
      return;
    }

    this.categoryFilter()?.onReset(false);
    this.occasionFilter()?.onReset(false);
    this.ratingFilter()?.onReset(false);
    this.priceFilter()?.onReset(false);

    this.currentState.set({});
    this.filterChange.emit({});
  }

  private bindViewportMode(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const browserWindow = this.document.defaultView;

    if (!browserWindow) {
      return;
    }

    fromEvent(browserWindow, 'resize')
      .pipe(
        auditTime(120),
        startWith(null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const nextMode = this.resolveViewportMode(browserWindow.innerWidth);

        if (nextMode !== this.viewportMode()) {
          this.viewportMode.set(nextMode);
        }

        if (nextMode !== 'mobile') {
          this.isMobileDrawerOpen.set(false);
        }

        if (nextMode !== 'tablet') {
          this.isTabletPanelExpanded.set(false);
        }
      });
  }

  private resolveViewportMode(width: number): FilterLayoutMode {
    if (width >= 1024) {
      return 'desktop';
    }

    if (width >= 768) {
      return 'tablet';
    }

    return 'mobile';
  }
}