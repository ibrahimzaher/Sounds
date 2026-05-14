import { DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadingTitleComponent } from '../../../../shared/components/ui/heading/heading-title.component';
import { Review } from '../../../products/interfaces/review';
import {
  TextareaInputComponent,
  TextInputComponent,
} from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';
import { AuthState } from '@elevate/auth-domain';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-reviews',
  imports: [
    DatePipe,
    HeadingTitleComponent,
    TextInputComponent,
    TextareaInputComponent,
    ButtonComponent,
    TranslateModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './product-reviews.component.html',
})
export class ProductReviewsComponent {
  private readonly authState = inject(AuthState);
  readonly user = this.authState.isAuthenticated;
  reviews = input.required<Review[]>();
  selectedRating = signal(0);
  hoveredRating = signal(0);
  readonly reviewMessage = new FormControl('', { nonNullable: true });

  setRating(rating: number) {
    this.selectedRating.set(rating);
  }

  setHoveredRating(rating: number) {
    this.hoveredRating.set(rating);
  }

  clearHoveredRating() {
    this.hoveredRating.set(0);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
