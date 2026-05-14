import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { languageService } from '../../../../core/services/language-service';
import {
  formatLocalizedDate,
  formatLocalizedTime,
  getLocaleFromLanguage,
} from '../../../../shared/utils/date-time/date-time-utils';
import { Order, OrderItem } from '../../interfaces/orders.interface';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  templateUrl: './order-card.component.html',
  host: {
    class: 'block',
  },
})
export class OrderCardComponent {
  private readonly language = inject(languageService);
  private readonly router = inject(Router);
  private readonly previewItemsCount = 2;

  readonly order = input.required<Order>();
  readonly isExpanded = input(false);
  readonly toggleExpanded = output<string>();
  readonly locale = computed(() =>
    getLocaleFromLanguage(this.language.currentLang())
  );
  readonly formatLocalizedDate = formatLocalizedDate;
  readonly formatLocalizedTime = formatLocalizedTime;

  readonly visibleItems = computed(() => {
    const items = this.order().orderItems;
    return this.isExpanded() ? items : items.slice(0, this.previewItemsCount);
  });
  readonly hiddenPreviewItems = computed(() =>
    this.order().orderItems.slice(
      this.previewItemsCount,
      this.previewItemsCount * 2
    )
  );

  readonly hasHiddenItems = computed(
    () => this.order().orderItems.length > this.previewItemsCount
  );

  onToggleExpanded(): void {
    this.toggleExpanded.emit(this.order()._id);
  }

  getPaymentMethodKey(paymentType: string): string {
    return paymentType.toLowerCase() === 'card' ? 'ORDERS.CARD' : 'ORDERS.CASH';
  }

  getPaymentBadgeKey(isPaid: boolean): string {
    return isPaid ? 'ORDERS.PAID' : 'ORDERS.UNPAID';
  }

  getPaymentBadgeClass(isPaid: boolean): string {
    return isPaid
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
      : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300';
  }

  getMainStatusKey(order: Order): string {
    const normalizedState = order.state.toLowerCase();

    if (normalizedState === 'cancelled') {
      return 'ORDERS.CANCELLED';
    }

    if (
      order.isDelivered ||
      normalizedState === 'delivered' ||
      normalizedState === 'done'
    ) {
      return 'ORDERS.DONE';
    }

    return 'ORDERS.IN_PROGRESS';
  }

  getMainStatusClass(order: Order): string {
    const statusKey = this.getMainStatusKey(order);

    if (statusKey === 'ORDERS.CANCELLED') {
      return 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300';
    }

    if (statusKey === 'ORDERS.DONE') {
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300';
    }

    return 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300';
  }

  getDeliveryStatusKey(order: Order): string {
    const normalizedState = order.state.toLowerCase();

    if (normalizedState === 'cancelled') {
      return 'ORDERS.CANCELLED';
    }

    if (
      order.isDelivered ||
      normalizedState === 'delivered' ||
      normalizedState === 'done'
    ) {
      return 'ORDERS.DELIVERED';
    }

    return 'ORDERS.PENDING';
  }

  getDeliveryStatusClass(order: Order): string {
    const statusKey = this.getDeliveryStatusKey(order);

    if (statusKey === 'ORDERS.CANCELLED') {
      return 'text-red-600 dark:text-red-300';
    }

    if (statusKey === 'ORDERS.DELIVERED') {
      return 'text-emerald-600 dark:text-emerald-300';
    }

    return 'text-amber-600 dark:text-amber-300';
  }

  getDeliveryStatusIcon(order: Order): string {
    const statusKey = this.getDeliveryStatusKey(order);

    if (statusKey === 'ORDERS.CANCELLED') {
      return 'alert-triangle';
    }

    if (statusKey === 'ORDERS.DELIVERED') {
      return 'check';
    }

    return 'clock-3';
  }

  getPaymentMethodIcon(paymentType: string): string {
    return paymentType.toLowerCase() === 'card' ? 'credit-card' : 'banknote';
  }

  getItemTotal(item: OrderItem): number {
    return item.price * item.quantity;
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}
