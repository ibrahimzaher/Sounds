import { Product as ProductCardModel } from '../../shared/components/ui/product-card/interface/product';
import { product as HomeProduct } from './interfaces/home';

export function mapToProductCard(product: HomeProduct): ProductCardModel {
  return {
    _id: product._id,
    title: product.title,
    slug: product.slug ?? '',
    description: product.description,
    imgCover: product.imgCover,
    images: product.images,
    price: product.price,
    priceAfterDiscount: product.priceAfterDiscount ?? null,
    quantity: product.quantity,
    category: product.category,
    occasion: product.occasion,
    createdAt: product.createdAt ?? '',
    updatedAt: product.updatedAt ?? '',
    sold: product.sold ?? 0,
    rateAvg: product.rateAvg ?? 0,
    rateCount: product.rateCount ?? 0,
    isSuperAdmin: product.isSuperAdmin ?? false,
    favoriteId: null,
    isInWishlist: false,
  };
}
