export interface ReviewResponse {
  message: string;
  metadata: Metadata;
  reviews: Review[];
}

export interface Metadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export interface Review {
  _id: string;
  product: ReviewProduct;
  user: ReviewUser;
  rating: number;
  title: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReviewProduct {
  _id: string;
  title: string;
  imgCover: string;
  id: string;
}

export interface ReviewUser {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
}
