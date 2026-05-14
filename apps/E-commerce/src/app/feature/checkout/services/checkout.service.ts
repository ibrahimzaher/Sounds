import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import {
  CheckoutSessionRes,
  OrderInput,
  OrderRes,
  PaymentMethod,
} from '../interfaces/checkout.interface';
import { APP_ORIGIN } from '../../../core/tokens/origin.token';
import { ShippingAddress } from '../../shipping-address/interfaces/shipping-address.interface';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _origin = inject(APP_ORIGIN);

  createOrder(
    address: ShippingAddress,
    method: PaymentMethod
  ): Observable<OrderRes | CheckoutSessionRes> {
    const orderData: OrderInput = {
      shippingAddress: {
        street: address.street,
        phone: address.phone,
        city: address.city,
        lat: address.lat || '0',
        long: address.long || '0',
      },
    };

    if (method === 'cash') {
      return this.placeCashOrder(orderData);
    }

    return this.placeOnlineOrder(orderData);
  }

  placeCashOrder(orderData: OrderInput): Observable<OrderRes> {
    return this._httpClient.post<OrderRes>(
      `${environment.baseUrl}/orders`,
      orderData
    );
  }

  placeOnlineOrder(orderData: OrderInput): Observable<CheckoutSessionRes> {
    const origin = this._origin || environment.baseUrl;

    return this._httpClient.post<CheckoutSessionRes>(
      `${environment.baseUrl}/orders/checkout?url=${encodeURIComponent(
        origin
      )}`,
      orderData
    );
  }
}
