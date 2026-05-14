import { Injectable, signal } from '@angular/core';
import { ShippingAddress } from '../../../../../../feature/shipping-address/interfaces/shipping-address.interface';

@Injectable()
export class AddressStateService {
  mode = signal<'view' | 'add' | 'edit'>('view');
  address = signal<ShippingAddress | null>(null);
}
