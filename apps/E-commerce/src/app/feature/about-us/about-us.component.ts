import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@elevate/reusable-ui';
import { languageService } from '../../core/services/language-service';
import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';
import { AboutValueCardItem } from './interfaces/about.interface';
import { AboutValueCardComponent } from './components/about-value-card/about-value-card.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    ButtonComponent,
    LucideAngularModule,
    AboutValueCardComponent,
  ],
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent {
  private readonly langService = inject(languageService);

  readonly isRtl = computed(() => this.langService.isRTL());

  readonly arrowIcon = computed(() =>
    this.langService.isRTL() ? ArrowLeft : ArrowRight
  );

  readonly features: ReadonlyArray<string> = [
    'ABOUT_SECTION.FEATURE_1',
    'ABOUT_SECTION.FEATURE_2',
    'ABOUT_SECTION.FEATURE_3',
    'ABOUT_SECTION.FEATURE_4',
  ];

  readonly valueCards: ReadonlyArray<AboutValueCardItem> = [
    {
      icon: 'check',
      titleKey: 'ABOUT_PAGE.CARDS.QUALITY.TITLE',
      descriptionKey: 'ABOUT_PAGE.CARDS.QUALITY.DESCRIPTION',
    },
    {
      icon: 'package',
      titleKey: 'ABOUT_PAGE.CARDS.PACKAGING.TITLE',
      descriptionKey: 'ABOUT_PAGE.CARDS.PACKAGING.DESCRIPTION',
    },
    {
      icon: 'clock-3',
      titleKey: 'ABOUT_PAGE.CARDS.DELIVERY.TITLE',
      descriptionKey: 'ABOUT_PAGE.CARDS.DELIVERY.DESCRIPTION',
    },
    {
      icon: 'zap',
      titleKey: 'ABOUT_PAGE.CARDS.SUPPORT.TITLE',
      descriptionKey: 'ABOUT_PAGE.CARDS.SUPPORT.DESCRIPTION',
    },
  ];
}
