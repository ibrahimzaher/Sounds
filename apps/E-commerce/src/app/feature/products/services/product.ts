import { environment } from '../../../../environments/environments';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductQueryParams, ProductsResponse, CategoriesRes, OccasionsRes } from '../interfaces/product';
import { Product } from '../../../shared/components/ui/product-card/interface/product';
import { ReviewResponse } from '../interfaces/review';
import { RelatedProductsResponse } from '../interfaces/related';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  getProducts(
    {
      page = 1,
      limit = 12,
      keyword,
      categoryIds,
      occasionIds,
      rating,
      priceFrom,
      priceTo,
    }: ProductQueryParams = {},
    options: { context?: HttpContext } = {}
  ): Observable<ProductsResponse> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));

    const normalizedKeyword = keyword?.trim();
    if (normalizedKeyword) {
      params = params.set('keyword', normalizedKeyword);
    }

    if (categoryIds?.length) {
      categoryIds.forEach((id) => {
        params = params.append('category', id);
      });
    }

    if (occasionIds?.length) {
      occasionIds.forEach((id) => {
        params = params.append('occasion', id);
      });
    }

    if (rating) {
      params = params.set('rateAvg', String(rating));
    }

    if (priceFrom !== undefined) {
      params = params.set('price[gte]', String(priceFrom));
    }

    if (priceTo !== undefined) {
      params = params.set('price[lte]', String(priceTo));
    }

    return this.http.get<ProductsResponse>(`${this.baseUrl}/products`, {
      params,
      context: options.context,
    });
  }

  getOccasions(page = 1, limit = 100): Observable<OccasionsRes> {
    return this.http.get<OccasionsRes>(
      `${this.baseUrl}/occasions?page=${page}&limit=${limit}`
    );
  }

  getCategories(page = 1, limit = 100): Observable<CategoriesRes> {
    return this.http.get<CategoriesRes>(
      `${this.baseUrl}/categories?page=${page}&limit=${limit}`
    );
  }

  getProductById(id: string) {
    return this.http.get<{ product: Product }>(
      `${this.baseUrl}/products/${id}`
    );
  }

  getProductReviews(productId: string) {
    return this.http.get<ReviewResponse>(
      `${this.baseUrl}/products/${productId}/reviews`
    );
  }

  getRelatedProductByID(product_id: string) {
    return this.http.get<RelatedProductsResponse>(
      `${this.baseUrl}/related/category/${product_id}`
    );
  }
}