export interface OrdersResponse {
  message: string;
  metadata: OrdersMetadata;
  orders: Order[];
}

export interface OrdersMetadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  __v: number;
}

export interface OrderItem {
  _id: string;
  product: OrderProduct;
  price: number;
  quantity: number;
}

export interface OrderProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number | null;
  discount?: number;
  rateAvg: number;
  rateCount: number;
  sold: number;
  quantity: number;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id?: string;
}