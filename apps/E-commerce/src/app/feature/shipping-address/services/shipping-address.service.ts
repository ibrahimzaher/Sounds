import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environments';
import {
  AddAddressParams,
  ShippingAddressResponse,
  UpdateAddressParams,
} from '../interfaces/shipping-address.interface';

@Injectable({
  providedIn: 'root',
})
export class ShippingAddressService {
  private readonly httpClient = inject(HttpClient);
  getLoggedUserAddress() {
    return this.httpClient.get<ShippingAddressResponse>(
      `${environment.baseUrl}/addresses`
    );
  }
  addAddress(address: AddAddressParams) {
    return this.httpClient.patch<ShippingAddressResponse>(
      `${environment.baseUrl}/addresses`,
      address
    );
  }
  updateAddress(id: string, address: UpdateAddressParams) {
    return this.httpClient.patch<ShippingAddressResponse>(
      `${environment.baseUrl}/addresses/${id}`,
      address
    );
  }
  removeAddress(id: string) {
    return this.httpClient.delete<ShippingAddressResponse>(
      `${environment.baseUrl}/addresses/${id}`
    );
  }
}
