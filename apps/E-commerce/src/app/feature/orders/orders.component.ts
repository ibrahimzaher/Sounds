import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { PaginatorComponent } from '../../shared/components/ui/paginator/paginator.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { Order, OrdersMetadata } from './interfaces/orders.interface';
import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [TranslateModule, LucideAngularModule, NgTemplateOutlet, PaginatorComponent, OrderCardComponent],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  private readonly ordersService = inject(OrdersService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly orders = signal<Order[]>([]);
  readonly metadata = signal<OrdersMetadata | null>(null);
  readonly isLoading = signal(true);
  readonly rows = signal(3);
  readonly first = signal(0);
  readonly expandedOrderIds = signal<Set<string>>(new Set<string>());
  readonly skeletonCards = [1, 2, 3];
  readonly skeletonItems = [1, 2];
  readonly skeletonLineClass = 'animate-pulse bg-zinc-200 dark:bg-zinc-800';
  readonly skeletonHeaderLines = [
    'h-7 w-48 rounded-full',
    'h-6 w-20 rounded-full',
  ];
  readonly skeletonMetaLines = ['h-4 w-40 rounded', 'h-4 w-32 rounded'];
  readonly skeletonItemTextLines = [
    'h-4 w-3/4 rounded',
    'h-3 w-1/2 rounded',
    'h-4 w-1/3 rounded',
  ];

  readonly showPaginator = computed(() => {
    const metadata = this.metadata();
    return !!metadata && metadata.totalItems > this.rows();
  });

  constructor() {
    this.loadOrders();
  }

  loadOrders(page = 1, limit = this.rows()): void {
    this.isLoading.set(true);

    this.ordersService
      .getOrders(page, limit)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => {
          this.orders.set(res.orders);
          this.metadata.set(res.metadata);
          this.rows.set(res.metadata.limit);
          this.first.set(
            (res.metadata.currentPage - 1) * res.metadata.limit
          );
          this.expandedOrderIds.set(new Set<string>());
        },
      });
  }

  onPageChange(event: PaginatorState): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows();
    const page = event.page !== undefined ? event.page + 1 : first / rows + 1;

    this.first.set(first);
    this.rows.set(rows);
    this.loadOrders(page, rows);
  }

  toggleExpanded(orderId: string): void {
    this.expandedOrderIds.update((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(orderId)) {
        nextIds.delete(orderId);
      } else {
        nextIds.add(orderId);
      }

      return nextIds;
    });
  }

  isExpanded(orderId: string): boolean {
    return this.expandedOrderIds().has(orderId);
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
}