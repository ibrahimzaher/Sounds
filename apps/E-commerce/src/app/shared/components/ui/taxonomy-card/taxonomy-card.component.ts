import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Image, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-taxonomy-card',
  imports: [TranslatePipe, LucideAngularModule],
  templateUrl: './taxonomy-card.component.html',
})
export class TaxonomyCardComponent {
  private readonly router = inject(Router);

  readonly title = input.required<string>();
  readonly imageUrl = input<string | undefined>();
  readonly queryParamName = input.required<string>();
  readonly queryParamValue = input.required<string>();
  readonly productsCount = input<number | undefined>();
  readonly productsCountKey = input.required<string>();
  readonly ImageIcon = Image;

  navigateToProducts(): void {
    this.router.navigate(['/products'], {
      queryParams: {
        [this.queryParamName()]: this.queryParamValue(),
      },
    });
  }

}
