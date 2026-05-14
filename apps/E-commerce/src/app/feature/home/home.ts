import { MostPopular } from './components/most-popular/most-popular';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { GallerySectionComponent } from './components/gallery-section/gallery-section.component';
import { TrustedByComponent } from './components/trusted/trusted-by.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { Product } from '../../shared/components/ui/product-card/interface/product';
import { FeaturesBarComponent } from './components/features-bar/features-bar.component';
import { HomeService } from './services/home';
import { mapToProductCard } from './home.mapper';
import { AboutUsComponent } from '../about-us/about-us.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroSectionComponent,
    BestSellerComponent,
    TrustedByComponent,
    TestimonialComponent,
    FeaturesBarComponent,
    GallerySectionComponent,
    AboutUsComponent,
    MostPopular,
  ],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private readonly homeService = inject(HomeService);
  bestSellers = signal<Product[]>([]);

  ngOnInit(): void {
    this.homeService.getHomeData().subscribe((res) => {
      if (res.bestSeller) {
        this.bestSellers.set(res.bestSeller.map(mapToProductCard));
      }
    });
  }
}
