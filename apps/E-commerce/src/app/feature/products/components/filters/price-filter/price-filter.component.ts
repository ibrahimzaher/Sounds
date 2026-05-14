import { Component, computed, output, signal } from '@angular/core';
import { FilterResetBtnComponent } from '../filter-reset-btn/filter-reset-btn.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

type PriceError = 'negative' | 'range' | null;

@Component({
  selector: 'app-price-filter',
  imports: [FilterResetBtnComponent, TranslatePipe, FormsModule],
  templateUrl: './price-filter.component.html'
})
export class PriceFilterComponent {
  priceFrom = signal<number | null>(null);
  priceTo   = signal<number | null>(null);

  priceChange = output<{ from?: number; to?: number } | null>();

  readonly validationError = computed<PriceError>(() => {
    const from = this.priceFrom();
    const to   = this.priceTo();

    if ((from !== null && from < 0) || (to !== null && to < 0)) {
      return 'negative';
    }
    if (from !== null && to !== null && to < from) {
      return 'range';
    }
    return null;
  });

  readonly hasValues = computed(
    () => this.priceFrom() !== null || this.priceTo() !== null
  );

  onPriceFromInput(value: number | null): void {
    this.priceFrom.set(value);
  }

  onPriceToInput(value: number | null): void {
    this.priceTo.set(value);
  }

  onPriceChange(): void {
    if (this.validationError()) {
      return;
    }

    const from = this.priceFrom() ?? undefined;
    const to   = this.priceTo()   ?? undefined;

    if (from === undefined && to === undefined) {
      this.priceChange.emit(null);
    } else {
      this.priceChange.emit({ from, to });
    }
  }

  onReset(emitChange = true): void {
    this.priceFrom.set(null);
    this.priceTo.set(null);

    if (emitChange) {
      this.priceChange.emit(null);
    }
  }
}