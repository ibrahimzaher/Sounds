import { Product } from '../../../shared/components/ui/product-card/interface/product';

export interface RelatedProductsResponse {
  message: string;
  count: number;
  relatedProducts: Product[];
}