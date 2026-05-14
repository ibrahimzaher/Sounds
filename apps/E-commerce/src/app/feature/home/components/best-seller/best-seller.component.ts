import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslateModule } from '@ngx-translate/core';
import { ArrowLeft, ArrowRight } from 'lucide-angular';
import { languageService } from '../../../../core/services/language-service';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';
import { ProdcutCarousalComponent } from '../../../../shared/components/ui/product-carousal/prodcut-carousal.component';

@Component({
  selector: 'app-best-seller',
  imports: [
    RouterLink,
    ButtonComponent,
    TranslateModule,
    ProdcutCarousalComponent,
  ],
  templateUrl: './best-seller.component.html',
})
export class BestSellerComponent {
  private readonly langService = inject(languageService);

  bestSellers = input.required<Product[]>();
  readonly ctaArrowIcon = computed(() =>
    this.langService.isRTL() ? ArrowLeft : ArrowRight
  );

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '1200px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
  ];
}
