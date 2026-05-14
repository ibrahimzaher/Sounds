import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderTittle } from 'apps/E-commerce/src/app/shared/components/ui/header-tittle/header-tittle';
import { ProductCardComponent } from 'apps/E-commerce/src/app/shared/components/ui/product-card/product-card.component';
import { Product as ProductCardModel } from 'apps/E-commerce/src/app/shared/components/ui/product-card/interface/product';
import { pategoryOrOccasion } from '../../interfaces/home';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule, ArrowLeft, ArrowRight } from 'lucide-angular';
import { HomeService } from '../../services/home';
import { mapToProductCard } from '../../home.mapper';

@Component({
  selector: 'app-most-popular',
  imports: [RouterLink, HeaderTittle, ProductCardComponent, TranslateModule, LucideAngularModule],
  templateUrl: './most-popular.html',
})
export class MostPopular {
  translate = inject(TranslateService);
  readonly arrowLeft = ArrowLeft;
  readonly arrowRight = ArrowRight;

  private readonly homeService = inject(HomeService);
  private readonly homeData = toSignal(this.homeService.getHomeData());
  readonly selectedId = signal<string | null>(null);
  readonly isLoading = computed(() => this.homeData() === undefined);

  private readonly occasionIdsWithProducts = computed<Set<string>>(() => {
    const ids = (this.homeData()?.products ?? []).map((p) => p.occasion);
    return new Set(ids);
  });

  readonly occasions = computed<pategoryOrOccasion[]>(() =>
    (this.homeData()?.occasions ?? []).filter((occasion) =>
      this.occasionIdsWithProducts().has(occasion._id)
    )
  );

  private readonly allProducts = computed<ProductCardModel[]>(() =>
    (this.homeData()?.products ?? []).map(mapToProductCard)
  );

  readonly filteredProducts = computed<ProductCardModel[]>(() => {
    const id = this.selectedId();
    const products = this.allProducts();
    if (!id) return products.slice(0, 16);
    return products.filter((product) => product.occasion === id).slice(0, 16);
  });

  selectFilter(id: string | null): void {
    this.selectedId.set(id);
  }
}