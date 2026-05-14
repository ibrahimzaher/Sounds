import { ShippingAddress } from '../../shipping-address/interfaces/shipping-address.interface';

export type PaymentMethod = 'cash' | 'card';

export interface OrderInput {
  shippingAddress: {
    street: string;
    phone: string;
    city: string;
    lat: string;
    long: string;
  };
}

export interface OrderRes {
  status: string;
  data: any; // Order details
}

export interface CheckoutSessionRes {
  status: string;
  session: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
}
