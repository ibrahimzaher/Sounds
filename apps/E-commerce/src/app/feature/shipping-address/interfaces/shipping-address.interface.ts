export interface ShippingAddressResponse {
  message: string;
  addresses?: ShippingAddress[];
  address?: ShippingAddress[];
}

export interface ShippingAddress {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  _id: string;
  username?: string;
}
export type AddAddressParams = Omit<ShippingAddress, '_id'>;
export type UpdateAddressParams = Partial<AddAddressParams>;
