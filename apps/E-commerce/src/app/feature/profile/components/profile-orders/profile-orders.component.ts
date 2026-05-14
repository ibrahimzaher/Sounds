import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrdersComponent } from '../../../orders/orders.component';

@Component({
  selector: 'app-profile-orders',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OrdersComponent],
  template: `<app-orders></app-orders>`,
})
export class ProfileOrdersComponent {}
