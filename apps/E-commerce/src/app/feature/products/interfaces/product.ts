export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productsCount?: number;
  createdAt?: string;
  updatedAt?: string;
  isSuperAdmin?: boolean;
}

export interface CategoriesRes {
  message: string;
  metadata: {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
  categories: Category[];
}

export interface FilterState {
  categoryIds?: string[];
  occasionIds?: string[];
  rating?: number;
  priceFrom?: number;
  priceTo?: number;
}

export interface Brand {
  _id: string;
  name: string;
  image: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  sold: number;
  rateAvg: number;
  rateCount: number;
  isSuperAdmin: boolean;
  favoriteId: string | null;
  isInWishlist: boolean;
  discount?: number;
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  next?: number;
  prev?: number;
}

export interface ProductsResponse {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  products: Product[];
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  keyword?: string;
  categoryIds?: string[];
  occasionIds?: string[];
  rating?: number;
  priceFrom?: number;
  priceTo?: number;
}

export interface Occasion {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  isSuperAdmin?: boolean;
  productsCount?: number;
}

export interface OccasionsRes {
  message: string;
  metadata: PaginationMetadata;
  occasions: Occasion[];
}
