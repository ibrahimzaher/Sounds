import { Product } from '../../products/interfaces/product';

export interface ICartResponse {
  message: string;
  numOfCartItems: number;
  cart: Cart;
}

export interface Cart {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: AppliedCoupon[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  discount: number;
  totalPriceAfterDiscount: number;
}

export interface CartItem {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
}

export interface AppliedCoupon {
  coupon: Coupon;
  discountAmount: number;
  appliedAt: string;
  _id: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discountType: string;
  discountValue: number;
}

export interface IClearCart {
  message: string;
}
